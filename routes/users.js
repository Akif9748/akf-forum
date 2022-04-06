const { Router } = require("express");
const app = Router();

const error = require("../errors/error");

const { User } = require("../classes");
const { UserModel, MessageModel, ThreadModel } = require("../models");

app.get("/", async (req, res) => {
    const user = req.user
    const users = await UserModel.find({});

    const links = users.filter(user => !user.deleted).map(user => "/users/" + user.id);
    return res.render("users", { users, links, user })

});

app.get("/:id", async (req, res) => {
    const user = req.user
    const { id = null } = req.params;
    const member = await new User().getById(req.params.id);


    if (member && (user?.admin || !member.deleted)) {

        const message = await MessageModel.count({ authorID: id });
        const thread = await ThreadModel.count({ authorID: id });
        const counts = { message, thread }
        res.render("user", { user, member, counts })
    }
    else error(res, 404, "We have not got this user.");

});

app.use(require("../middlewares/login"));


app.post("/:id/delete/", async (req, res) => {
    const user = req.user;
    if (!user?.admin)
        return error(res, 403, "You have not got permission for this.");

    const { id = null } = req.params;
    const member = await new User().getById(id);

    if (!member || member.deleted) return error(res, 404, "We have not got any user declared as this id.");

    member.deleted = true;
    member.write();

    res.redirect("/admin");
});

module.exports = app;