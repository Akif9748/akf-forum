const { User, Thread } = require("../../classes/index");


module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const info = req.body;
    const thread = new Thread(info.title, info.content, new User().getId(req.session.userid)).takeId();
    thread.write()
    res.redirect('/threads/' + thread.id);

}