const { Thread, Message, User } = require("../classes");
const error = require("../errors/error")
const db = require("quick.db")

const { Router } = require("express");

const app = Router();

app.get("/open*", (req, res) => {

    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid)
    res.render("openThread", { user })

});

app.get("/", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const user = new User().getId(req.session.userid);

    const threads = db.get("threads").slice(0, 10)
    const links = threads.map(thread => "/threads/" + threads.indexOf(thread))

    return res.render("threads", { threads, links, user })

});


app.get("/:id", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const { id } = req.params;

    const thread = new Thread().getId(id);

    if (thread) {
        const user = new User().getId(req.session.userid);
        const messages = thread.messages.filter(id => !new Message().getId(id).deleted).map(id => new Message().getId(id));
        res.render("thread", { thread, messages, user })
    } else
        error(res, 404, "We have not got this thread.");
});

app.post("/", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const user = new User().getId(req.session.userid);

    const { title = null, content = null } = req.body;

    if (!title || !content) return error(res, 400, "Title and content is missing");

    const thread = new Thread(title, user).takeId().write();
    
    thread
        .push(new Message(content, user, thread).takeId().write().id)
        .write();

    res.redirect('/threads/' + thread.id);

})


module.exports = app;