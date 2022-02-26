const { User } = require("../../classes/index");


module.exports = (req, res) => {    
    
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid)
    res.render("openThread", { user })

}