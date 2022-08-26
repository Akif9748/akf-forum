const { Router } = require("express");
const app = Router();

const { ThreadModel, MessageModel } = require("../models")


app.get("/", async (req, res) => {

    const user = req.user;

    const threads = await ThreadModel.find(user?.admin ? {} : { deleted: false }).limit(10);

    return res.render("threads", { threads, user });
});


app.get("/create*", async (req, res) => {

    const user = req.user
    res.render("create_thread", { user })

});

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await ThreadModel.get(id);
    const user = req.user;

    if (thread && (user?.admin || !thread.deleted)) {

        const messages = await Promise.all(thread.messages.map(async id => {
            const message = await MessageModel.get(id)           
            return user?.admin || !message?.deleted ? message.toObject({ virtuals: true }) : null;
        }));

        res.render("thread", { thread, messages, user,scroll:req.query.scroll || false });
    } else
        res.error( 404, "We have not got this thread.");
});


module.exports = app;