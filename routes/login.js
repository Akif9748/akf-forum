const { User } = require("../classes");
const db = require("quick.db")

const { Router } = require("express")
const error = require("../errors/error")

const app = Router();

app.get("/", (req, res) => res.render("login"));

app.post("/", (req, res) => {
    req.session.loggedin = false;
    req.session.username = null;
    req.session.userid = null;
    const { username = null, password = null } = req.body;

    if (username && password) {
        const user = db.get("secret." + username)
        if (user) {
            // Authenticate the user
            if (user.key !== password) return error(res, 403, 'Incorrect Password!')
            if (new User().getName(username).deleted) return error(res, 403, 'Incorrect Username and/or Password!')
            req.session.loggedin = true;
            req.session.username = username;
            req.session.userid = user.id;

            res.redirect('/');
        } else
            error(res, 403, 'Incorrect Username and/or Password!')


    } else
        error(res, 400, "You forgot entering some values")



})


module.exports = app;