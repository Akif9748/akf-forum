const { UserModel, SecretModel } = require("../models");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const rateLimit = require('express-rate-limit')

const app = Router();

app.get("/", rateLimit({
    windowMs: 24 * 60 * 60_000, max: 1, standardHeaders: true, legacyHeaders: false,
    handler: (_r, response, _n, options) => response.error(options.statusCode, "You are begin ratelimited")
}), (req, res) => res.reply("register", { user: null }));

app.post("/", async (req, res) => {
    req.session.userid = null;


    let { username = null, password: body_pass = null, avatar, about } = req.body;

    if (!username || !body_pass) return res.error(res, 400, "You forgot entering some values");
    const user = await SecretModel.findOne({ username });

    if (user) return res.error(res, 400, `We have got an user named ${username}!`)


    const user2 = new UserModel({ name: req.body.username })
    if (avatar && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.test(avatar)) user2.avatar = avatar;

    if (about) user2.about = about;

    await user2.takeId()
    await user2.save();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body_pass, salt);
    await SecretModel.create({ username, password, id: user2.id })
    req.session.userid = user2.id;

    res.redirect('/');



})


module.exports = app;