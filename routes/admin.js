const { Router } = require("express")

const app = Router();

app.get("/", async (req, res) => {
    if (!req.session.userid) return res.redirect('/login');

    const user = req.user;

    if (!user?.admin) return res.error(  403, "You have not got permissions for view to this page.");

    res.reply("admin", {  user2: false })
});



module.exports = app;
