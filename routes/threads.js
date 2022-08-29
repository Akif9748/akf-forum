const { Router } = require("express");
const app = Router();

const { ThreadModel, MessageModel } = require("../models")


app.get("/", async (req, res) => {

    const threads = await ThreadModel.find(req.user?.admin ? {} : { deleted: false })//.limit(10);

    return res.reply("threads", { threads });
});


app.get("/create/", (req, res) => res.reply("create_thread"));

app.get("/:id/", async (req, res) => {

    const { user, params: { id } } = req

    let page = Number(req.query.page || 0);

    const thread = await ThreadModel.get(id)
    thread.count = await thread.messageCount(user?.admin);
    thread.pages = Math.ceil(thread.count / 10);
    if (thread && (user?.admin || !thread.deleted)) {
        thread.views++;
        const query = { threadID: id };
        if (!user || !user.admin) query.deleted = false;

        const messages = await MessageModel.find(query).sort({ time: 1 }).limit(10).skip(page * 10)
            .then(messages => messages.map(message => {
                message.content = message.content.replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;").replaceAll(">", "&gt;")
                    .replaceAll("\"", "&quot;").replaceAll("'", "&#39;")
                    .replaceAll("\n", "<br>");
                return message.toObject({ virtuals: true });
            }))

        res.reply("thread", { page, thread, messages, scroll: req.query.scroll || thread.messages[0].id });

        thread.save();

    } else
        res.error(404, `We don't have any thread with id ${id}.`);
});


module.exports = app;