const { MessageModel, ThreadModel } = require("../../../models");
const { Router } = require("express")
const { RL, threadEnum } = require('../../../lib');

const app = Router();
app.param("id", async (req, res, next, id) => {
    req.thread = await ThreadModel.get(id);

    if (!req.thread) return res.error(404, `We don't have any thread with id ${id}.`);

    if (req.thread.state !== "OPEN" && !req.user?.admin)
        return res.error(404, `You do not have permissions to view this thread with id ${id}.`)

    next();
});

app.get("/:id", async (req, res) => res.complate(req.thread));

app.get("/:id/messages/", async (req, res) => {

    const { id } = req.params;
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);

    const query = { threadID: id };
    if (!req.user.admin) query.deleted = false;

    const options = { sort: { time: -1 } };
    if (limit) options.limit = limit;
    if (skip) options.skip = skip;

    const messages = await MessageModel.find(query, null, options)

    if (!messages.length) return res.error(404, "We don't have any messages in this with your query thread.");

    res.complate(messages);

})

app.post("/", RL(5 * 60_000, 1), async (req, res) => {

    const { title, content, category } = req.body;

    if (!content || !title) return res.error(400, "Missing content/title in request body.");
    const limits = req.app.get("limits");

    if (title.length < 5 || title.length > limits.title) return res.error(400, `title must be between 5 - ${limits.title} characters`);
    if (content.length < 5 || content.length > limits.message) return res.error(400, `content must be between 5 - ${limits.message} characters`);
    const { user } = req;
    const thread = await new ThreadModel({ title, author: user }).takeId()
    if (category)
        thread.categoryID = category;
    const message = await new MessageModel({ content, author: user, threadID: thread.id }).takeId()
    await thread.push(message.id).save();
    await message.save();

    res.complate(thread);

});

app.patch("/:id/", async (req, res) => {
    const { user, thread } = req;

    if (user.id !== thread.authorID && !user.admin) return res.error(403, "You have not got permission for this.");
    if (!Object.values(req.body).some(Boolean)) return res.error(400, "Missing thread informations for update in request body.");


    const { title, state } = req.body;

    if (title) {
        const limits = req.app.get("limits");

        if (title.length < 5 || title.length > limits.title) return res.error(400, `title must be between 5 - ${limits.title} characters`);
        if (thread.oldTitles.at(-1) == title) return res.error(400, "You can't use the same title as the previous one.");

        thread.oldTitles.push(thread.title = title);
    }


    if (state) {
        if (!user.admin)
            return res.error(403, "You have not got permission for change state.");

        if (thread.state === state) return res.error(400, "You can't change thread state to same state.");
        if (!threadEnum.includes(state)) return res.error(400, "Invalid thread state.");
        if (thread.deleted)
            await MessageModel.updateMany({ threadID: thread.id }, { deleted: false });
        thread.state = state;
    }

    await thread.save();

    res.complate(thread);

})
app.delete("/:id/", async (req, res) => {

    const { user, thread } = req;
    if (user.id != thread.authorID && !user.admin)
        return res.error(403, "You have not got permission for this.");

    if (thread.deleted) return res.error(404, "This thread is already deleted.");
    thread.deleted= true;
    await thread.save();

    await MessageModel.updateMany({ threadID: thread.id }, { deleted: true });
    res.complate(thread);

})

module.exports = app;