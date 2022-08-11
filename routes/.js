const { UserModel, ThreadModel, MessageModel } = require("../models")
const { Router } = require("express");
const app = Router();

app.get("/", async (req, res) => {
    const
        mem = process.memoryUsage().heapUsed / Math.pow(2, 20),
        users = await UserModel.count({}),
        threads = await ThreadModel.count({}),
        messages = await MessageModel.count({}),
        user = req.user;

    res.render("index", { mem, user, users, threads, messages })

})

module.exports = app;