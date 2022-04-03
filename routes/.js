const { User } = require("../classes");
const { get } = require("quick.db")

const { Router } = require("express");
const app = Router();

app.get("/", (req, res) => {

    const
        mem = process.memoryUsage().heapUsed / Math.pow(2, 20),
        users = get("users").length,
        threads = get("threads").length,
        messages = get("messages").length,
        user = new User().getId(req.session.userid);

    res.render("index", { mem, user, users, threads, messages })

})


module.exports = app;