const { Router } = require("express");
const app = Router();

const { ThreadModel,MessageModel } = require("../models")


app.get("/", async (req, res) => {

    const threads = await ThreadModel.find(req.user?.admin ? {} : { deleted: false })//.limit(10);

    return res.reply("threads", { threads });
});


app.get("/create*", (req, res) => res.reply("create_thread"));

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await ThreadModel.get(id);
    thread.views++;

    if (thread && (req.user?.admin || !thread.deleted)) {
        const messages = await Promise.all(thread.messages.map(async id => {
            const message = await MessageModel.get(id)
            message.content = message.content.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;").replaceAll("\n", "<br>")
            return req.user?.admin || !message?.deleted ? message.toObject({ virtuals: true }) : null;
        }));

        res.reply("thread", { thread, messages, scroll: req.query.scroll || false });
    } else
        res.error(404, "We have not got this thread.");
    thread.save();
});


module.exports = app;