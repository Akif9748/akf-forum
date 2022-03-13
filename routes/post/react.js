const error = require("../../errors/error.js")
const { Message, User } = require("../../classes/index");

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const id = req.url.slice(7);
    if (!id) error(res, 404, "Id of request is missing");

    const info = req.body;
    const user = new User().getId(req.session.userid);
    const message = new Message().getId(id);
    if (message) {
        if (!(user.id in message.react))
            message.react[user.id] = "like" in info;
        else
            delete message.react[user.id];

        message.write();
        res.redirect("/threads/" + message.thread.id);
    } else error(res, 404, "We have not got this Message for reacting.");


}