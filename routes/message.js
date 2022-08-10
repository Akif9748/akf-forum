const { MessageModel } = require("../models");

const { Router } = require("express");

const app = Router();

app.get("/:id", async (req, res) => {
    const message = await MessageModel.get(req.params.id);

    if (!message || (message.deleted && req.user && !req.user.admin)) return res.error( 404, "We have not got any message declared as this id.");
    res.redirect("/threads/" + message.threadID);

});

app.use(require("../middlewares/login"));

app.post("/:id/delete", async (req, res) => {
    const message = await MessageModel.get(req.params.id);
    if (!message || message.deleted) return res.error( 404, "We have not got any message declared as this id.");
    const user = req.user;
    if (user.id != message.authorID && !user.admin)
        return res.error( 403, "You have not got permission for this.");
    message.deleted = true;
    await message.save();


    res.status(200).redirect("/threads/" + message.threadID);

})



module.exports = app;