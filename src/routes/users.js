const { Router } = require("express");
const app = Router();
const { UserModel, MessageModel, ThreadModel } = require("../models");

app.get("/", async (req, res) => {
    const page = Number(req.query.page) || 0;
    const query = req.user?.admin ? {} : { deleted: false };
    let users = await UserModel.find(query).limit(10).skip(page * 10);
    return res.reply("users", { users, page, pages: Math.ceil(await UserModel.countDocuments(query) / 10) });
});

app.get("/:id/avatar", async (req, res) => {
    if (!req.user || (!req.user.admin && req.params.id !== req.user.id)) return res.error(403, "You have not got permission for this.");
    const member = await UserModel.get(req.params.id);

    if (member && (req.user?.admin || !member.deleted))
        res.reply("avatar_upload", { member })
    else
        res.error(404, `We don't have any user with id ${req.params.id}.`);
})

app.get("/:id", async (req, res) => {
    const user = req.user
    const { id } = req.params;
    const member = await UserModel.get(id, "+lastSeen +ips");

    if (member && (user?.admin || !member.deleted)) {

        const message = await MessageModel.countDocuments({ authorID: id });
        const thread = await ThreadModel.countDocuments({ authorID: id });
        res.reply("user", { member, counts: { message, thread }, discord: req.app.get("DISCORD_AUTH_URL") })
    }
    else res.error(404, `We don't have any user with id ${id}.`);

});

app.get("/:id/edit", async (req, res) => {
    const user = req.user
    const { id } = req.params;
    const member = await UserModel.get(id);
    if (!member) return res.error(404, `We don't have any user with id ${id}.`);
    if (user?.admin || user.id === member.id)
        return res.reply("edit_user", { member });

    res.error(403, "You have not got permission for this.");

});


module.exports = app;