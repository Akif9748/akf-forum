const { User } = require("../../classes/index");
const { get } = require("quick.db");
const error = require("../../errors/error.js");

module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid)

    if (!user.admin) return error(res, 404, "You have not got permissions for view to this page.");

    res.render("admin", { user })
} 
