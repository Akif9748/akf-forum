const { UserModel, SecretModel } = require("../models");
const { Router } = require("express");
const app = Router();
const bcrypt = require("bcrypt");

app.get("/", (req, res) => res.reply("login", { redirect: req.query.redirect, user: null }));

app.post("/", async (req, res) => {
    req.session.userID = null;

    const { username = null, password = null } = req.body;

    if (!username || !password)
        return res.error(400, "You forgot entering some values")

    const user = await SecretModel.findOne({ username });
    if (!user) return res.error(403, 'Incorrect Username and/or Password!');

    if (!await bcrypt.compare(password, user.password)) return res.error(403, 'Incorrect Password!')
    const member = await UserModel.findOne({ name: username });
    if (!member || member.deleted) return res.error(403, 'Incorrect Username and/or Password!')

    req.session.userID = user.id;

    res.redirect(req.query.redirect || '/');

});

module.exports = app;