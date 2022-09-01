const { Router } = require("express");
const app = Router();

const { UserModel, MessageModel, ThreadModel } = require("../models");

app.get("/", async ({ user }, res) => {
    const users = await UserModel.find(user?.admin ? {} : { deleted: false });
    return res.reply("users", { users })

});

app.get("/:id/edit", async (req, res) => {
    if(!req.user || (!req.user.admin&&req.params.id !== req.user.id)) return res.error(403, "You have not got permission for this.");
    const member = await UserModel.get(req.params.id);

    if (member && (req.user?.admin || !member.deleted))
        res.reply("edit_user", { member })
    else
        res.error(404, `We don't have any user with id ${req.params.id}.`);

});

app.get("/:id", async (req, res) => {
    const user = req.user
    const { id } = req.params;
    const member = await UserModel.get(id);

    if (member && (user?.admin || !member.deleted)) {

        const message = await MessageModel.count({ authorID: id });
        const thread = await ThreadModel.count({ authorID: id });
        member.about = member.about.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;").replaceAll(">", "&gt;")
            .replaceAll("\"", "&quot;").replaceAll("'", "&#39;")
            .replaceAll("\n", "<br>");
        res.reply("user", { member, counts: { message, thread } })
    }
    else res.error(404, `We don't have any user with id ${id}.`);

});

module.exports = app;