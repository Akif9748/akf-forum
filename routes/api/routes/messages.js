const { MessageModel, ThreadModel } = require("../../../models");
const rateLimit = require('express-rate-limit')

const { Router } = require("express")

const app = Router();

app.param("id", async (req, res, next, id) => {
    req.message = await MessageModel.get(id);

    if (!req.message) return res.error(404, `We don't have any message with id ${id}.`);

    if (req.message.deleted && !req.user?.admin)
        return res.error(404, `You do not have permissions to view this message with id ${id}.`)

    next();
});


app.get("/:id", async (req, res) => {

    res.complate(message);

})
app.patch("/:id/", async (req, res) => {


    const { message, user } = req;

    if (user.id !== message.authorID && !user.admin) return res.error(403, "You have not got permission for this.");
    const { content = null } = req.body;
    if (!content) return res.error(400, "Missing message content in request body.");
    message.content = content;
    message.edited = true;

    await message.save();
    res.complate(message);

})

app.post("/", rateLimit({
    windowMs: 60_000, max: 1, standardHeaders: true, legacyHeaders: false,
    handler: (request, response, next, options) =>
        !request.user.admin ? response.error(options.statusCode, "You are begin ratelimited") : next()
}), async (req, res) => {

    const { threadID, content } = req.body;
    if (!content) return res.error(400, "Missing message content in request body.");

    const thread = await ThreadModel.get(threadID);

    if (!thread) return res.error(404, `We don't have any thread with id ${threadID}.`);

    const message = await new MessageModel({ content, author: req.user, threadID: thread.id }).takeId();
    await message.save();
    await thread.push(message.id).save();

    res.complate(message);

})
app.post("/:id/react/:type", async (req, res) => {


    const { message } = req;

    if (req.params.type == "like") {
        if (message.react.like.includes(req.user.id))
            message.react.like.pull(req.user.id);
        else {
            message.react.like.push(req.user.id);
            message.react.dislike.pull(req.user.id);
        }


    } else if (req.params.type == "dislike") {

        if (message.react.dislike.includes(req.user.id))
            message.react.dislike.pull(req.user.id);
        else {
            message.react.dislike.push(req.user.id);
            message.react.like.pull(req.user.id);
        }

    } else
        return res.error(400, `We don't have any react type with name ${req.params.type}.`);

    await message.save();

    res.complate(message);

});

app.delete("/:id/", async (req, res) => {


    const { message, user } = req;

    if (user.id != message.authorID && !user.admin)
        return res.error(403, "You have not got permission for this.");
    if (message.deleted) return res.error(403, "This message is already deleted.");

    message.deleted = true;
    await message.save();
    res.complate(message);

})

app.post("/:id/undelete", async (req, res) => {


    const { message } = req;

    if (!message.deleted) return res.error(404, "This message is not deleted, first, delete it.");

    message.deleted = false;
    await message.save();

    res.complate(message);

})

module.exports = app;