const { User } = require("../classes");
const { get } = require("quick.db")

const { Router } = require("express");
const app = Router();

app.get("/", (req, res) => {

    if (!req.session.loggedin) return res.redirect('/login');

    const mem = process.memoryUsage().heapUsed / Math.pow(2, 20);

    const users = get("users").length;

    const threads = get("threads").length;

    const messages = get("messages").length;

    const user = new User().getId(req.session.userid)

    res.render("index", { mem, user, users, threads, messages })

})


module.exports = app;