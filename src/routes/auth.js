const { Router } = require("express")
const { UserModel } = require("../models");
const fetch = require("node-fetch");
const app = Router();
const { host, email_auth } = require("../../config.json")

app.get("/discord", async (req, res) => {
    const client_id = process.env.DISCORD_ID;
    if (!client_id) return res.error(404, "Discord auth is disabled")
    const { code } = req.query;
    if (!code) return res.error(400, "No code provided");
    try {
        const response = await fetch('https://discord.com/api/v10/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id, code,
                client_secret: process.env.DISCORD_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: host + "/auth/discord",
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) return res.error(500, "Bad request to discord");

        const { access_token, token_type } = await response.json();

        const discord = await fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `${token_type} ${access_token}` }
        }).then(res => res.json());

        const forum = await UserModel.findOne({ discordID: discord.id });

        if (req.user) {
            if (req.user.discordID)
                return res.error(403, "Your forum account is already linked to a discord account.");

            if (forum)
                return res.error(409, "This discord account is already linked to a forum account.");

            req.user.discordID = discord.id;
            req.user.discord_code = code;
            await req.user.save();
            return res.redirect(`/users/${req.user.id}`)
        }


        if (forum) {
            req.session.userID = forum.id;
            return res.redirect("/");
        }

        let name = discord.username;
        while (await UserModel.exists({ name }))
            name += Math.floor(Math.random() * 2);

        const user2 = new UserModel({
            name, discordID: discord.id, discord_code: code,
            avatar: `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png?size=256`
        });

        await user2.takeId();
        await user2.save();

        req.session.userID = user2.id;

        res.redirect("/");
    } catch (error) {
        res.error(500, "Something went wrong");
        console.error(error);
    }
});

app.delete("/discord", async (req, res) => {
    if (!req.user) return res.error(401, "You are not logged in");
    if (!req.user.discordID) return res.error(403, "You don't have a discord account linked to your forum account.");
    req.user.discordID = undefined;
    req.user.discord_code = undefined;
    await req.user.save();
    res.send("Your discord account has been unlinked from your forum account.");
});

app.get("/email", async (req, res) => {
    if (!email_auth) return res.error(404, "Email auth is disabled");
    if (!req.user) return res.error(401, "You are not logged in");
    if (req.user.email) return res.error(403, "You already have an email linked to your account.");
    const { code } = req.query;
    if (!code) return res.error(400, "No code provided");
    if (code !== req.user.email_code) return res.error(403, "Invalid code");
    req.user.state = "ACTIVE";
    await req.user.save();
    res.send("Your email has been linked to your forum account.");
});

module.exports = app;