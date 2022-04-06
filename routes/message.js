const { Thread, Message, User } = require("../classes");
const error = require("../errors/error")

const { Router } = require("express");

const app = Router();

app.get("/:id", async (req, res) => {
    const message = await new Message().getById(req.params.id);

    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");
    res.redirect("/threads/" + message.threadID);

});

app.use(require("../middlewares/login"));


app.post("/", async (req, res) => {
 //   if (req.ratelimit) return error(res, 429, "Wait until " + new Date(req.timeout.until).toLocaleTimeString("tr") + ", you are too quick for send.")

    const thread = await new Thread().getById(req.body.threadID);
    if (thread) {
        const message = await new Message(req.body.content, req.user, thread.id).takeId()
        await message.write();
        thread.push(message.id);
        thread.write();

       // req.timeout.until += 1000 * 30;
      //  await req.timeout.save()

        res.redirect('/threads/' + req.body.threadID);

    }
    else
        error(res, 404, "We have not got this thread.");

});

app.post("/:id/delete", async (req, res) => {
    const message = await new Message().getById(req.params.id)
    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");
    const user = req.user;
    if (user.id != message.authorID && !user.admin)
        return error(res, 403, "You have not got permission for this.");
    message.deleted = true;
    message.write();


    res.status(200).redirect("/threads/" + message.threadID);

})
app.post("/:id/react", async (req, res) => {
    const { id = null } = req.params;
    const info = req.body;
    const message = await new Message().getById(id);
    if (message) {
        if (!(req.session.userid in message.react))
            message.react[req.session.userid] = "like" in info;
        else
            delete message.react[req.session.userid];

        message.write();
        res.redirect("/threads/" + message.threadID);
    } else error(res, 404, "We have not got this Message for reacting.");


});




module.exports = app;