const { User } = require("../classes");
const db = require("quick.db")

const { Router } = require("express")
const error = require("../errors/error")

const app = Router();

app.get("/", (req, res) => res.render("register"));

app.post("/", (req, res) => {
    req.session.loggedin = false;
    req.session.username = null;
    req.session.userid = null;
    const { username = null, password = null } = req.body;


    if (username && password) {
        const user = db.get("secret." + username)

        if (user)
            error(res, 404, `We have got an user named ${username}!`)

        else {
            const user2 = new User(req.body.username, req.body.avatar).takeId()
            db.set("secret." + username, { id: user2.id, key: password })
            req.session.loggedin = true;
            req.session.username = username;
            req.session.userid = user2.id;
            user2.write()
            res.redirect('/');
        }

    } else
        error(res, 400, "You forgot entering some values")


})


module.exports = app;