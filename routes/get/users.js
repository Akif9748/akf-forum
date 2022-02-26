const { Thread, Message, User } = require("../../classes/index");
const db = require("quick.db");
const error = require("../../errors/error.js")

module.exports = (req,res) =>{
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid)

    const id = req.url.slice(7);

    if (!id) {

        const users = db.get("users").slice(0, 10);

        const links = users.map(user => "/users/" + user.id)
        return res.render("users", { users, links, user })

    }

    const member = new User().getId(id);


    if (member)
        res.render("user", { user, member })
    else
        error(res, 404, "We have not got this user.");

}