const { Router } = require("express");
const app = Router();

const { Thread, Message, User } = require("../classes");
const error = require("../errors/error")
const { ThreadModel } = require("../models")


app.get("/", async (req, res) => {

    const user = req.user;

    const threads = await Promise.all((await ThreadModel.find({}).limit(10))
        .map(async threads => await new Thread().getById(threads.id)));

    return res.render("threads", { threads, user });
});


app.get("/open*", async (req, res) => {

    const user = req.user
    res.render("openThread", { user })

});

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await new Thread().getById(id);

    if (thread) {
        const user = req.user;

        const messages = await Promise.all(thread.messages.map(async id => {
            const message = await new Message().getById(id)
            return (message.deleted || !message) ? null : message;
        }));

        res.render("thread", { thread, messages, user })
    } else
        error(res, 404, "We have not got this thread.");
});




app.use(require("../middlewares/login"));


app.post("/", async (req, res) => {
    if (req.ratelimit)
        return error(res, 429, "Wait until " + new Date(req.timeout.until).toLocaleTimeString("tr") + ", you are too quick for send.")

    const { title = null, content = null } = req.body;

    if (!title || !content) return error(res, 400, "Title and/or content is missing");
    const user =  req.user
    const thread = await new Thread(title, user).takeId()
    const message = await new Message(content, user, thread.id).takeId()

    thread.push(message.id).write();

    message.write();

    res.redirect('/threads/' + thread.id);
})


module.exports = app;