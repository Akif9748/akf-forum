const { User, Thread, Message } = require("../../classes/index");


module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid);
    const info = req.body;
    const thread = new Thread(info.title, user).takeId().write();
    thread.push(new Message(info.content, user, thread).takeId().write().id)
    thread.write();

    res.redirect('/threads/' + thread.id);

}