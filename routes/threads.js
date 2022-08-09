const { Router } = require("express");
const app = Router();
const rateLimit = require('express-rate-limit')

const error = require("../errors/error")
const { ThreadModel, MessageModel } = require("../models")


app.get("/", async (req, res) => {

    const user = req.user;

    const threads = await ThreadModel.find({}).limit(10);

    return res.render("threads", { threads, user });
});


app.get("/create*", async (req, res) => {

    const user = req.user
    res.render("createThread", { user })

});

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await ThreadModel.get(id);

    if (thread) {
        const user = req.user;

        const messages = await Promise.all(thread.messages.map(async id => {
            const message = await MessageModel.get(id)
            return (user.admin || !message?.deleted) ? message : null;
        }));

        res.render("thread", { thread, messages, user })
    } else
        error(res, 404, "We have not got this thread.");
});




app.use(require("../middlewares/login"));


app.post("/", rateLimit({
    windowMs: 10*60_000, max: 1, standardHeaders: true, legacyHeaders: false
}), async (req, res) => {

    const { title = null, content = null } = req.body;

    if (!title || !content) return error(res, 400, "Title and/or content is missing");
    const user = req.user
    const thread = await new ThreadModel({ title, author: user }).takeId()

    const message = await new MessageModel({ content, author: user, threadID: thread.id }).takeId()

    await thread.push(message.id).save();

    await message.save();

    res.redirect('/threads/' + thread.id);
})


module.exports = app;