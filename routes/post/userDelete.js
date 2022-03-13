const { User, Message } = require("../../classes/index");
const error = require("../../errors/error.js");

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid);
    if (!user.admin)
        return error(res, 403, "You have not got permission for this.");

    const id = req.url.slice(9 + 3)
    const member = new User().getId(id);
    if (!member || member.deleted) return error(res, 404, "We have not got any user declared as this id.");
 
    member.deleted = true;
    member.write();
    
    res.redirect("/admin");
}