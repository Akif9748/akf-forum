const { UserModel } = require("../models");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { RL} = require('../lib');
const app = Router();

app.use(async (req, res, next) => {
    if (!req.user) return res.error(403, "You are not logged in");
    next();
});

app.get("/", (req, res) => res.reply("security"));

app.post("/", RL(24 * 60 * 60_000, 5), async (req, res) => {

    let { old_password, password } = req.body;
    if (!old_password || !password) return res.error(400, "You forgot entering some values");
    const { names } = req.app.get("limits");
    if (password.length < 3 || password.length > names) return res.error(400, "Password must be between 3 - 25 characters");
    const user = await UserModel.get(req.user.id, "+password");
    if (!await bcrypt.compare(old_password, user.password)) return res.error(401, 'Incorrect password!');
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.send("Password changed");

});

module.exports = app;