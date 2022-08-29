const { MessageModel, ThreadModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const { id } = req.params;

    const thread = await ThreadModel.get(id);
    if (thread && (req.user?.admin || !thread.deleted))
        res.complate(thread.toObject({ virtuals: true }));
    else
        return res.error(404, `We don't have any thread with id ${id}.`);


});

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

    res.complate(messages.map(x => x.toObject({ virtuals: true })));

})

app.post("/", async (req, res) => {

    const { title = null, content = null } = req.body;

    if (!content || !title) return res.error(400, "Missing content/title in request body.");

    const user = req.user;
    const thread = await new ThreadModel({ title, author: user }).takeId()
    const message = await new MessageModel({ content, author: user, threadID: thread.id }).takeId()
    await thread.push(message.id).save();
    await message.save();

    res.complate(thread.toObject({ virtuals: true }));

});
app.post("/:id/edit", async (req, res) => {

    const thread = await ThreadModel.get(req.params.id);

    if (!thread || (thread.deleted && req.user && !req.user.admin)) return res.error(404, `We don't have any message with id ${req.params.id}.`);

    if (req.user.id !== thread.authorID && !req.user.admin) return res.error(403, "You have not got permission for this.");
    const { title = null } = req.body;
    if (!title) return res.error(400, "Missing thread title in request body.");
    thread.title = title;
    await thread.save();

    res.complate(thread.toObject({ virtuals: true }));

})
app.post("/:id/delete", async (req, res) => {
    const thread = await ThreadModel.get(req.params.id);
    if (!thread || thread.deleted) return res.error(404, `We don't have any thread with id ${req.params.id}.`);
    const user = req.user;
    if (user.id != thread.authorID && !user.admin)
        return res.error(403, "You have not got permission for this.");

    thread.deleted = true;
    await thread.save();

    res.complate(thread.toObject({ virtuals: true }));

})
app.post("/:id/undelete", async (req, res) => {
    if (!req.user.admin) return res.error(403, "You have not got permission for this.");

    const thread = await ThreadModel.get(req.params.id);

    if (!thread )  return res.error(404, `We don't have any thread with id ${req.params.id}.`);
   
    if (!thread.deleted) return res.error(404, "This thread is not deleted, first, delete it.");

    thread.deleted = false;
    thread.edited=true; 

    await thread.save();

    res.complate(thread.toObject({ virtuals: true }));

})
module.exports = app;