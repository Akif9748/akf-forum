const { UserModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const { id = null } = req.params;

    const member = await UserModel.get(id);
    if (!member || (member.deleted && !req.user.admin)) return res.error(404, `We don't have any user with id ${id}.`);

    res.complate(member);

});

app.post("/:id/delete/", async (req, res) => {
    const user = req.user;
    if (!user.admin)
        return res.error(403, "You have not got permission for this.");

    const { id = null } = req.params;
    const member = await UserModel.get(id);

    if (!member || member.deleted) return res.error(404, `We don't have any user with id ${id}.`);

    member.deleted = true;
    await member.save();

    res.complate(member);
});
app.post("/:id/undelete/", async (req, res) => {
    if (!req.user.admin) return res.error(403, "You have not got permission for this.");

    const member = await UserModel.get(req.params.id);

    if (!member )  return res.error(404, `We don't have any user with id ${req.params.id}.`);

    if (!member.deleted) return res.error(404, "This user is not deleted, first, delete it.");

    member.deleted = false;
    await member.save();

    res.complate(member.toObject({ virtuals: true }));

})
app.post("/:id/admin/", async (req, res) => {

    const user = req.user;

    if (!user.admin) return res.error(403, "You have not got permission for this.");
    const user2 = await UserModel.get(req.params.id);

    if (!user2)
        return res.error(404, `We don't have any user with id ${id}.`);

    else {
        user2.admin = true;
        await user2.save()
    }

    res.complate(user2);

});
module.exports = app;