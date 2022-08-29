const { BanModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.use((req, res, next) => {
    if (!req.user || !req.user.admin) return res.error(403, "You have not got permission for this.");
    next();
});

app.get("/", async (req, res) => {
    const bans = await BanModel.find({});
    res.complate(bans);
});
app.get("/:ip", async (req, res) => {
    const ban = await BanModel.findOne({ ip: req.params.ip });
    if (!ban) return res.error(400, "This ip is not banned.");
    res.complate(ban);

});

app.post("/:ip", async (req, res) => {

    if (await BanModel.exists({ ip: req.params.ip })) return res.error(400, "This ip is already banned.");
    res.complate(await BanModel.create({ ip: req.params.ip, reason: req.query.reason || "No reason given", authorID: req.user.id }));

});

app.delete("/:ip/", async (req, res) => {

    if (!await BanModel.exists({ ip: req.params.ip })) return res.error(400, "This ip is already not banned.");
    res.complate(await BanModel.deleteOne({ ip: req.params.ip }));

});
module.exports = app;