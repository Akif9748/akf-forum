const { Thread, Message, User } = require("../../classes/index");
const db = require("quick.db");

const error = require("../../errors/error.js");

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const id = req.url.slice(9);
    const user = new User().getId(req.session.userid);

    if (!id) {
        const threads = db.get("threads").slice(0, 10)
        const links = threads.map(thread => "/threads/" + threads.indexOf(thread))
   
        return res.render("threads", { threads, links, user})
    }
    const thread = new Thread().getId(id);

    if (thread) {
        const messages = thread.messages.filter(id => !new Message().getId(id).deleted).map(id => new Message().getId(id));
        res.render("thread", { thread, messages, user  })
    } else
        error(res, 404, "We have not got this thread.");
}