const { MessageModel } = require("../models");

const { Router } = require("express");

const app = Router();

app.get("/:id", async (req, res) => {
    const message = await MessageModel.get(req.params.id);

    if (!message || (message.deleted && req.user && !req.user.admin)) return res.error( 404,
        `We don't have any message with id ${req.params.id}.`);
    res.redirect(`/threads/${message.threadID}?scroll=${req.params.id}`);

});

module.exports = app;