const { Router } = require("express")
const { BanModel,UserModel } = require("../models");
const app = Router();

app.get("/", async (req, res) => {
    if (!req.user?.admin) return res.error(403, "You have not got permissions for view to this page.");
    res.reply("admin",{bans: await BanModel.find({}), admins: await UserModel.find({admin: true})});
});
module.exports = app;