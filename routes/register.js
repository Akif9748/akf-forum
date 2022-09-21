const { UserModel, SecretModel } = require("../models");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { RL } = require('../lib');
const app = Router();

app.get("/", (req, res) => res.reply("register", { user: null, discord: req.app.get("discord_auth") }));

app.post("/", RL(24 * 60 * 60_000, 5), async (req, res) => {

    req.session.userID = null;

    let { username, password: body_pass, about } = req.body;

    if (!username || !body_pass) return res.error(400, "You forgot entering some values");
    const { names } = req.app.get("limits");
    if (username.length < 3 || names > 25) return res.error(400, "Username must be between 3 - 25 characters");
    if (body_pass.length < 3 || names > 25) return res.error(400, "Password must be between 3 - 25 characters");

    const user = await SecretModel.findOne({ username });

    if (user) return res.error(400, `We have got an user named ${username}!`)

    const user2 = new UserModel({ name: username })

    if (about) {
        if (about.length > 256) return res.error(400, "about must be under 256 characters");
        user2.about = about;
    }

    await user2.takeId()
    await user2.save();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body_pass, salt);
    await SecretModel.create({ username, password, id: user2.id })
    req.session.userID = user2.id;

    res.redirect('/');



})


module.exports = app;