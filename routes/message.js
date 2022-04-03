const { Thread, Message, User } = require("../classes");
const error = require("../errors/error")

const { Router } = require("express");

const app = Router();

app.get("/:id", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const message = new Message().getId(req.params.id);

    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");

    res.redirect("/threads/" + message.thread.id);

});

app.post("/", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');


    const thread = new Thread().getId(req.body.threadID);

    if (thread) {
        const message = new Message(req.body.content, new User().getId(req.session.userid), thread).takeId().write();
        thread.push(message.id)
        thread.write();
        res.redirect('/threads/' + req.body.threadID);

    }
    else
        error(res, 404, "We have not got this thread.");

});


app.post("/:id/delete", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const message = new Message().getId(req.params.id)
    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");
    const user = new User().getId(req.session.userid);
    if (user.id != message.author.id && !user.admin)
        return error(res, 403, "You have not got permission for this.");
    message.deleted = true;
    message.write();


    res.status(200).redirect("/threads/" + message.thread.id);

})
app.post("/:id/react", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const { id = null } = req.params;
    const info = req.body;
    const message = new Message().getId(id);
    if (message) {
        if (!(req.session.userid in message.react))
            message.react[req.session.userid] = "like" in info;
        else
            delete message.react[req.session.userid];

        message.write();
        res.redirect("/threads/" + message.thread.id);
    } else error(res, 404, "We have not got this Message for reacting.");


});

module.exports = app;