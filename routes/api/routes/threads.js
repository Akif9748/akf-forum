const { MessageModel, ThreadModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await ThreadModel.get(id);
    if (thread && (req.user?.admin || !thread.deleted))
        res.complate(thread);
    else
        return res.error(404,  `We don't have any thread with id ${id}.`);


});

app.get("/:id/messages/", async (req, res) => {


    const { id } = req.params;
    const limit = Number(req.query.limit);

    const query = { threadID: id };
    if (!req.user.admin)  query.deleted = false;

    const options = { sort: { date: -1 } };
    if (limit) options.limit = limit;

    const messages = await MessageModel.find(query, null, options)

    if (!messages.length) return res.error(404, "We don't have any messages in this thread.");

    res.complate(messages);

})

app.post("/", async (req, res) => {

    const { title = null, content = null } = req.body;

    if (!content || !title) return res.error(400, "Missing content/title in request body.");

    const user = req.user;
    const thread = await new ThreadModel({ title, author: user }).takeId()
    const message = await new MessageModel({ content, author: user, threadID: thread.id }).takeId()
    await thread.push(message.id).save();
    await message.save();

    res.complate(thread);

});

app.post("/:id/delete", async (req, res) => {
    const thread = await ThreadModel.get(req.params.id);
    if (!thread || thread.deleted) return res.error(404,  `We don't have any thread with id ${req.params.id}.`);
    const user = req.user;
    if (user.id != thread.authorID && !user.admin)
        return res.error(403, "You have not got permission for this.");

    thread.deleted = true;
    await thread.save();

    res.complate(thread);

})

module.exports = app;