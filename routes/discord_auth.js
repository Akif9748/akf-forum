const { Router } = require("express")
const { UserModel } = require("../models");
const fetch = require("node-fetch");
const app = Router();

app.get("/hash", (req, res) => res.send('<script>location.href=location.href.replace("#","?").replace("discord_auth/hash","discord_auth");</script>'))

app.get("/", async (req, res) => {
    const { access_token, token_type } = req.query;
    if (!access_token) return;
    try {
        const discord = await fetch('https://discord.com/api/users/@me', {
            headers: { authorization: `${token_type} ${access_token}` }
        }).then(res => res.json());

        const forum = await UserModel.findOne({ discordID: discord.id });


        if (req.user) {
            if (req.user.discordID)
                return res.error(403, "Your forum account is already linked to a discord account.");

            if (forum)
                return res.error(403, "This discord account is already linked to a forum account.");

            req.user.discordID = discord.id;
            await req.user.save();
            return res.send("Your discord account has been linked to your forum account.");
        }


        if (forum) {
            req.session.userID = forum.id;
            return res.redirect("/");
        }
        
        let name = discord.username + discord.discriminator;
        while (await UserModel.findOne({ name }))
            name += Math.floor(Math.random() * 2);

        const user2 = new UserModel({
            name, discordID: discord.id,
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

module.exports = app;