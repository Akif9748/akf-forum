const { Router } = require("express");
const app = Router();
const { ThreadModel, MessageModel, CategoryModel } = require("../models")

app.get("/", async (req, res) => {
    const page = Number(req.query.page) || 0;
    const query = req.user?.admin ? {} : { state: "OPEN" };
    let threads = await ThreadModel.find(query).limit(10).skip(page * 10).sort({ time: -1 });
    threads = await Promise.all(threads.map(thread => thread.get_author()));

    return res.reply("threads", { threads, page, title: "Threads", desp: threads.length + " threads are listed", pages: Math.ceil(await ThreadModel.countDocuments(query) / 10) });
});


app.get("/create/", async (req, res) => res.reply("create_thread", { categories: await CategoryModel.find() }));

app.get("/:id/", async (req, res) => {

    const { user, params: { id } } = req

    const page = Number(req.query.page || 0);

    const thread = await ThreadModel.get(id)
    if (thread && (user?.admin || thread.state == "OPEN")) {
        thread.count = await thread.messageCount(user?.admin);
        thread.pages = Math.ceil(thread.count / 10);
        thread.views++;
        const query = { threadID: id };
        if (!user || !user.admin) query.deleted = false;

        const messages = await Promise.all(await MessageModel.find(query).sort({ time: 1 }).limit(10).skip(page * 10)
            .then(messages => messages.map(message => message.get_author())));

        res.reply("thread", { page, thread, messages });

        thread.save();

    } else
        res.error(404, `We don't have any thread with id ${id}.`);
});


module.exports = app;