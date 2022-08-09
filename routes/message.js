const { ThreadModel, MessageModel } = require("../models");
const error = require("../errors/error")
const rateLimit = require('express-rate-limit')

const { Router } = require("express");

const app = Router();

app.get("/:id", async (req, res) => {
    const message = await MessageModel.get(req.params.id);

    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");
    res.redirect("/threads/" + message.threadID);

});

app.use(require("../middlewares/login"));

app.post("/", rateLimit({
    windowMs: 60_000, max: 1, standardHeaders: true, legacyHeaders: false
}), async (req, res) => {

    const thread = await ThreadModel.get(req.body.threadID);
    if (thread) {
        const message = await new MessageModel({ content: req.body.content, author: req.user, threadID: thread.id }).takeId();
        await message.save();
        await thread.push(message.id).save();

        res.redirect('/threads/' + req.body.threadID);

    }
    else
        error(res, 404, "We have not got this thread.");

});

app.post("/:id/delete", async (req, res) => {
    const message = await MessageModel.get(req.params.id);
    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");
    const user = req.user;
    if (user.id != message.authorID && !user.admin)
        return error(res, 403, "You have not got permission for this.");
    message.deleted = true;
    await message.save();


    res.status(200).redirect("/threads/" + message.threadID);

})
app.post("/:id/react", async (req, res) => {
    const info = req.body;
    const message = await MessageModel.get(req.params.id);
    if (message) {
        if (req.user.id in message.react)
            delete message.react[req.session.userid];
        else
            message.react[req.session.userid] = "like" in info;


        await message.save();
        res.redirect("/threads/" + message.threadID);
    } else error(res, 404, "We have not got this Message for reacting.");


});




module.exports = app;