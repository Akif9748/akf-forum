const { UserModel } = require("../models");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { RL } = require('../lib');
const app = Router();

app.get("/", (req, res) => res.reply("register", { user: null, discord: req.app.get("discord_auth") }));

app.post("/", RL(24 * 60 * 60_000, 5), async (req, res) => {

    req.session.userID = null;

    let { name, password, about } = req.body;

    if (!name || !password) return res.error(400, "You forgot entering some values");
    const { names } = req.app.get("limits");
    if (name.length < 3 || names > 25) return res.error(400, "Name must be between 3 - 25 characters");
    if (password.length < 3 || names > 25) return res.error(400, "Password must be between 3 - 25 characters");

    if (await UserModel.exists({ name })) return res.error(400, `We have got an user named ${name}!`)
    const user = new UserModel({ name });

    if (about) {
        if (about.length > 256) return res.error(400, "about must be under 256 characters");
        user.about = about;
    }

    await user.takeId()
    if (user.id === "0") user.admin = true;

    user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    await user.save();

    req.session.userID = user.id;

    res.redirect('/');

});

module.exports = app;