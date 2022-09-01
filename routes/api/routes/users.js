const { UserModel, SecretModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.param("id", async (req, res, next, id) => {
    req.member = await UserModel.get(id);

    if (!req.member) return res.error(404, `We don't have any user with id ${id}.`);

    if (req.member.deleted && !req.user?.admin)
        return res.error(404, `You do not have permissions to view this user with id ${id}.`);

    next();
});

app.get("/:id", async (req, res) => res.complate(req.member));

app.delete("/:id/", async (req, res) => {
    const { user, member } = req;

    if (!user.admin)
        return res.error(403, "You have not got permission for this.");

    const { id = null } = req.params;

    if (member.deleted) return res.error(404, `This user is with id ${id} already deleted.`);

    member.deleted = true;
    await member.save();

    res.complate(member);
});
app.post("/:id/undelete/", async (req, res) => {
    if (!req.user.admin) return res.error(403, "You have not got permission for this.");

    const { user, member } = req;

    if (!member) return res.error(404, `We don't have any user with id ${req.params.id}.`);

    if (!member.deleted) return res.error(404, "This user is not deleted, first, delete it.");

    member.deleted = false;
    await member.save();

    res.complate(member);

})


app.patch("/:id/", async (req, res) => {
    const { user, member } = req;

    if (req.user.id !== member.id && !user.admin) return res.error(403, "You have not got permission for this.");
    if (!Object.values(req.body).some(Boolean)) return res.error(400, "Missing member informations in request body.");

    const { avatar, name, about, theme, admin } = req.body;

    if (admin?.length && !req.user.admin) return res.error(403, "You have not got permission for edit 'admin' information, or bad request.");

    if (avatar && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.test(avatar))
        member.avatar = avatar;

    if (name) {
        await SecretModel.findOneAndUpdate({ name: member.name }, { name });
        member.name = name;
    }

    if (about) member.about = about;
    if (theme) 
        member.theme = member.theme === "default" ? "black" : "default";
    
    if(typeof admin === "boolean" || ["false","true"].includes(admin)) member.admin = admin;
    member.edited = true;

    await member.save();

    res.complate(member);

})

module.exports = app;