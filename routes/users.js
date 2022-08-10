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

        const message = await MessageModel.count({ authorID: id });
        const thread = await ThreadModel.count({ authorID: id });
        res.render("user", { user, member, counts: { message, thread } })
    }
    else res.error(404, "We have not got this user.");

});

app.use(require("../middlewares/login"));


app.post("/:id/delete/", async (req, res) => {
    const user = req.user;
    if (!user?.admin)
        return res.error( 403, "You have not got permission for this.");

    const { id = null } = req.params;
    const member = await UserModel.get(id);

    if (!member || member.deleted) return res.error( 404, "We have not got any user declared as this id.");

    member.deleted = true;
    await member.save();

    res.redirect("/admin");
});

module.exports = app;