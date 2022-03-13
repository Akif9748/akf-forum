const { Thread, Message, User } = require("../../classes/index");
const error = require("../../errors/error.js")

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const id = req.url.slice(9);
    const thread = new Thread().getId(id);

    if (thread) {
        const message = new Message(req.body.content, new User().getId(req.session.userid), thread).takeId().write();
        thread.push(message.id)
        thread.write();
        res.redirect('/threads/' + id);

    }
    else
        error(res, 404, "We have not got this thread.");

}