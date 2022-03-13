const { User } = require("../../classes/index");
const db = require("quick.db");
const error = require("../../errors/error.js")

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid)

    const id = req.url.slice(7);

    if (!id) {

        const users = db.get("users").slice(0);

        const links = users.filter(user=> !user.deleted).map(user => "/users/" + user.id)
        return res.render("users", { users, links, user })

    }

    const member = new User().getId(id);


    if (member && (user.admin || !member.deleted)) {
        const message = db.get("messages").filter(message => message.author.id === Number(id)).length
        const thread = db.get("threads").filter(thread => thread.author.id === Number(id)).length

        const counts = { message, thread }
        res.render("user", { user, member, counts })
    }
    else
        error(res, 404, "We have not got this user.");

}