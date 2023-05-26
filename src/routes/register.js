const { UserModel } = require("../models");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { RL, transporter, emailRegEx, getGravatar } = require('../lib');
const app = Router();
const { email_auth, forum_name, host } = require("../../config.json");
app.get("/", (req, res) => res.reply("register", { user: null, discord: req.app.get("DISCORD_AUTH_URL"), mail: email_auth }));

app.post("/", RL(24 * 60 * 60_000, 5), async (req, res) => {

    req.session.userID = null;

    let { name, password, about, email } = req.body;

    if (!name || !password || !email) return res.error(400, "You forgot entering some values");
    if (!emailRegEx.test(email)) return res.error(400, "E-mail is not valid");
    const { names } = req.app.get("limits");
    if (name.length < 3 || name.length > names) return res.error(400, "Name must be between 3 - 25 characters");
    if (password.length < 3 || password.length > names) return res.error(400, "Password must be between 3 - 25 characters");

    if (await UserModel.exists({ name })) return res.error(400, `We have got an user named ${name}!`)
    if (await UserModel.exists({ email })) return res.error(400, "E-mail is already in use");


    const user = new UserModel({ name, email });
    user.avatar = getGravatar(email, 128);

    if (about) {
        if (about.length > 256) return res.error(400, "about must be under 256 characters");
        user.about = about;
    }

    await user.takeId();

    if (user.id === "0")
        user.admin = true;
    else if (email_auth) {

        user.email_code = await bcrypt.hash(`${Date.now()}-${Math.floor(Math.random() * 1e20)}`, 10)

        transporter.sendMail({
            from: transporter.options.auth.user,
            to: email,
            subject: name + ", please verify your email",
            html: `
            <h1>Verify your email in ${forum_name}</h1>
            <a href="${host}/auth/email?code=${user.email_code}">Click here to verify your email</a>
            `
        }, (err) => {
            if (err) return res.error(500, "Failed to send email");
        });

    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    req.session.userID = user.id;

    res.redirect('/');

});

module.exports = app;