const { UserModel } = require("../models")

const { Router } = require("express")
const error = require("../errors/error")

const app = Router();

app.use(require("../middlewares/login"));

app.get("/", async (req, res) => {
    const user = req.user;

    if (!user.admin) return error(res, 403, "You have not got permissions for view to this page.");

    res.render("admin", { user, user2: false })
});

app.post("/", async (req, res) => {

    const user = req.user;

    if (!user.admin) return error(res, 403, "You have not got permissions for view to this page.");
    const user2 = await UserModel.get(req.body.userid);

    if (!user2)
        return error(res, 404, "We have not got this user in all of the forum. Vesselam.");

    else {
        user2.admin = true;
        await user2.save()
    }

    res.render("admin", { user, user2 })


});

module.exports = app;
