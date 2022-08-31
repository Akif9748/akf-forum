const { UserModel, ThreadModel, MessageModel } = require("../models")
const { Router } = require("express");
const app = Router();

app.get("/", async (req, res) => {
    

    const
        mem = process.memoryUsage().heapUsed / Math.pow(2, 20),
        users = await UserModel.count({deleted:false}),
        threads = await ThreadModel.count({deleted:false}),
        messages = await MessageModel.count({deleted:false});

    res.reply("index", { mem, users, threads, messages })

})

module.exports = app;