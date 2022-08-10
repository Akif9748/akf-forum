const { UserModel, MessageModel, ThreadModel } = require("../../../models");
const rateLimit = require('express-rate-limit')

const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {


    const { id = null } = req.params;
    if (!id) return res.error(400, "Missing id in query")
    const message = await MessageModel.get(id);

    if (!message || (message.deleted && req.user && !req.user.admin)) return res.error(404, "We have not got any message declared as this id.");

    res.complate(message);

})

app.post("/", rateLimit({
    windowMs: 60_000, max: 1, standardHeaders: true, legacyHeaders: false,
    handler: (request, response, next, options) =>
        !request.user.admin ?
            response.error(options.statusCode, "You are begin ratelimited")
            : next()
}), async (req, res) => {

    const { threadID = null, content = null } = req.body;
    if (!content) return res.error(400, "Missing message content in request body.");

    const thread = await ThreadModel.get(threadID);

    if (!thread) return res.error(404, "We have not got this thread.");

    const message = await new MessageModel({ content, author: req.user, threadID: thread.id }).takeId();
    await message.save();
    await thread.push(message.id).save();

    res.complate(message);

})
app.post("/:id/react/:type", async (req, res) => {

    const message = await MessageModel.get(req.params.id);
    if (message) {

        if (req.user.id in message.react)
            delete message.react[req.session.userid];
        else
            message.react[req.session.userid] = req.params.type === "like";
        message.markModified("react");
        await message.save();

        const arr = Object.values(message.react)
        res.complate(arr.filter(Boolean).length - arr.filter(x => !x).length)
    } else error(res, 404, "We have not got this Message for reacting.");


});

module.exports = app;