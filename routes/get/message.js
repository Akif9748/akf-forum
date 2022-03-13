const {  Message } = require("../../classes/index");
const error = require("../../errors/error.js");

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const id = req.url.slice(9);
    const message = new Message().getId(id)
                
    if (!message || message.deleted) return error(res, 404, "We have not got any message declared as this id.");

    res.redirect("/threads/" + message.thread.id);

}