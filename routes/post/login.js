const db = require("quick.db");
const error = require("../../errors/error.js")

module.exports = (req, res) => {
    req.session.loggedin = false;
    req.session.username = null;
    req.session.userid = null;
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        const user = db.get("secret." + username)
        if (user) {
            // Authenticate the user
            if (user.key !== password) return error(res, 404, 'Incorrect Password!')

            req.session.loggedin = true;
            req.session.username = username;
            req.session.userid = user.id;

            res.redirect('/');
        } else
            error(res, 404, 'Incorrect Username and/or Password!')


    } else
        error(res, 404, "You forgot entering some values")



}