const { User } = require("../classes");

const { Router } = require("express")
const error = require("../errors/error")

const app = Router();

app.get("/", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
    const user = new User().getId(req.session.userid)

    if (!user.admin) return error(res, 404, "You have not got permissions for view to this page.");

    res.render("admin", { user, user2: false })
}
);

app.post("/", (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');

    const user = new User().getId(req.session.userid)

    if (!user.admin) return error(res, 404, "You have not got permissions for view to this page.");
    const user2 = new User().getId(req.body.userid)

    if (!user2) 
    return error(res, 404, "We have not got this user in all of the forum. Vesselam.");

    else {
        user2.admin = true;
        user2.write()
    }

    res.render("admin", { user, user2 })


});

module.exports = app;