const { User, Message } = require("../../classes/index");
const error = require("../../errors/error.js");

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const id = req.url.slice(9 + 6)
    const message = new Message().getId(id)

    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");
    const user = new User().getId(req.session.userid);
    if (user.id != message.author.id && !user.admin)
        return error(res, 403, "You have not got permission for this.");
    message.deleted = true;
    message.write();


    res.redirect("/threads/" + message.thread.id);

}