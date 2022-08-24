const { Router } = require("express");
const app = Router();

const { UserModel, MessageModel, ThreadModel } = require("../models");

app.get("/", async ({ user }, res) => {
    const users = await UserModel.find(user?.admin ? {} : { deleted: false });
    return res.render("users", { users, user })

});

app.get("/:id", async (req, res) => {
    const user = req.user
    const { id = null } = req.params;
    const member = await UserModel.get(id);


    if (member && (user?.admin || !member.deleted)) {

        const message = await MessageModel.count({ "author.id": id });// this place was having problem. fixed
        const thread = await ThreadModel.count({ "author.id": id });
        res.render("user", { user, member, counts: { message, thread } })
    }
    else res.error(404, "We have not got this user.");

});

module.exports = app;