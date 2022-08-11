const { UserModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const { id = null } = req.params;
    if (!id) return res.error(400, "Missing id in query")
    const member = await UserModel.get(id);
    if (!member || (member.deleted && !req.user.admin)) return res.error(404, "We have not got any user declared as this id.");

    res.complate(member);

});

app.post("/:id/delete/", async (req, res) => {
    const user = req.user;
    if (!user.admin)
        return res.error(403, "You have not got permission for this.");

    const { id = null } = req.params;
    const member = await UserModel.get(id);

    if (!member || member.deleted) return res.error(404, "We have not got any user declared as this id.");

    member.deleted = true;
    await member.save();

    res.complate(member);
});
app.post("/:id/admin/", async (req, res) => {

    const user = req.user;

    if (!user.admin) return res.error(403, "You have not got permissions for view to this page.");
    const user2 = await UserModel.get(req.params.id);

    if (!user2)
        return res.error(404, "This user is not available.");

    else {
        user2.admin = true;
        await user2.save()
    }

    res.complate(user2);

});
module.exports = app;