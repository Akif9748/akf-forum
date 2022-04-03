const { User } = require("../classes");
const db = require("quick.db")

const { Router } = require("express")
const error = require("../errors/error")

const app = Router();

app.get("/", (req, res) => {
    const user = new User().getId(req.session.userid)
    const users = db.get("users").slice(0);

    const links = users.filter(user => !user.deleted).map(user => "/users/" + user.id);
    return res.render("users", { users, links, user })

});

app.get("/:id", (req, res) => {
    const user = new User().getId(req.session.userid)
    const { id = null } = req.params;
    const member = new User().getId(req.params.id);


    if (member && (user?.admin || !member.deleted)) {
        const message = db.get("messages").filter(message => message.author.id === Number(id)).length
        const thread = db.get("threads").filter(thread => thread.author.id === Number(id)).length

        const counts = { message, thread }
        res.render("user", { user, member, counts })
    }
    else error(res, 404, "We have not got this user.");

});

app.use(require("../middlewares/login"));


app.post("/:id/delete/", (req, res) => {
    const user = new User().getId(req.session.userid);
    if (!user?.admin)
        return error(res, 403, "You have not got permission for this.");

    const id = req.url.slice(9 + 3)
    const member = new User().getId(id);
    if (!member || member.deleted) return error(res, 404, "We have not got any user declared as this id.");
 
    member.deleted = true;
    member.write();
    
    res.redirect("/admin");
});

module.exports = app;