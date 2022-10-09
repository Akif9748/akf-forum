const { Router } = require("express");
const fs = require("fs");
const { BanModel, UserModel } = require("../models");
const app = Router();
app.use(async (req, res, next) => {
    if (!req.user?.admin) return res.error(403, "You are not admin");
    next();
});
app.get("/", async (req, res) => {
    res.reply("admin", { bans: await BanModel.find({}), admins: await UserModel.find({ admin: true }) });
});
app.get("/config", async (req, res) => {
    res.reply("config", { config: fs.readFileSync("./config.json", "utf8") });
});
module.exports = app;