const db = require("quick.db");
const error = require("../../errors/error.js")
const { User } = require("../../classes/index");

module.exports = (req, res) => {
    req.session.loggedin = false;
    req.session.username = null;
    req.session.userid = null;
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        const user = db.get("secret." + username)

        if (user) {
            error(res, 404, `We have got an user named ${username}!`)

        } else {
            let avatar = req.body.avatar || "/images/guest.png"
            const user2 = new User(req.body.username, avatar).takeId()
            db.set("secret." + username, { id: user2.id, key: password })
            req.session.loggedin = true;
            req.session.username = username;
            req.session.userid = user2.id;
            user2.write()
            res.redirect('/');
        }

    } else
        error(res, 404, "You forgot entering some values")


}