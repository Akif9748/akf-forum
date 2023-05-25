const { UserModel } = require("../models");
const { Router } = require("express");
const app = Router();
const bcrypt = require("bcrypt");

app.get("/", (req, res) => res.reply("login", { redirect: req.query.redirect, user: null, discord: req.app.get("DISCORD_AUTH_URL") }));

app.post("/", async (req, res) => {
    req.session.userID = null;

    const { name, password } = req.body;

    if (!name || !password) return res.error(400, "You forgot entering some values")

    const member = await UserModel.findOne({
        $or: [{ name }, { email: name }]
    }, "+password");
    if (!member || member.deleted) return res.error(401, 'Incorrect username or email!');
    if (!await bcrypt.compare(password, member.password)) return res.error(401, 'Incorrect password!');

    req.session.userID = member.id;

    res.redirect(req.query.redirect || '/');

});

module.exports = app;