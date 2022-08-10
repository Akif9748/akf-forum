const { Router } = require("express");
const app = Router();
const rateLimit = require('express-rate-limit')

const { ThreadModel, MessageModel } = require("../models")


app.get("/", async (req, res) => {

    const user = req.user;

    const threads = await ThreadModel.find(user?.admin ? {} : { deleted: false }).limit(10);

    return res.render("threads", { threads, user });
});


app.get("/create*", async (req, res) => {

    const user = req.user
    res.render("createThread", { user })

});

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await ThreadModel.get(id);
    const user = req.user;

    if (thread && (user?.admin || !thread.deleted)) {

        const messages = await Promise.all(thread.messages.map(async id => {
            const message = await MessageModel.get(id)
            const arr = Object.values(message.react)
            message.reactCount = arr.filter(Boolean).length - arr.filter(x => !x).length;
            
            return user?.admin || !message?.deleted ? message : null;
        }));

        res.render("thread", { thread, messages, user })
    } else
        res.error( 404, "We have not got this thread.");
});


module.exports = app;