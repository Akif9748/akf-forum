const { UserModel, SecretModel } = require("../../../models");
const { Router } = require("express");
const multer = require("multer");

const app = Router();

app.param("id", async (req, res, next, id) => {
    req.member = await UserModel.get(id, req.user.admin ? "+lastSeen": "");

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
    ;

    res.complate(await member.save());

})

app.patch("/:id/", async (req, res) => {
    const { user, member } = req;

    if (req.user.id !== member.id && !user.admin) return res.error(403, "You have not got permission for this.");
    if (!Object.values(req.body).some(Boolean)) return res.error(400, "Missing member informations in request body.");

    const { name, about, theme, admin, deleted } = req.body;

    if ((admin?.length || "deleted" in req.body) && !req.user.admin) return res.error(403, "You have not got permission for edit 'admin' and 'deleted' information, or bad request.");

    if (name) {
        await SecretModel.updateOne({ id: member.id }, { username: name });
        member.name = name;
    }

    if (about) member.about = about;
    if (theme || ["default", "black"].includes(theme)) member.theme = theme;

    if (typeof admin === "boolean" || ["false", "true"].includes(admin)) member.admin = admin;
    if (deleted === false) member.deleted = false;
    member.edited = true;

    res.complate(await member.save());

})
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './public/images/avatars')
    },
    filename: function (req, _file, cb) {
        cb(null, req.member.id + ".jpg")
    }
})

const upload = multer({ storage })

app.put("/:id/", upload.single('avatar'), async (req, res) => {
    const { member } = req;

    if (req.user.id !== member.id && !req.user.admin) return res.error(403, "You have not got permission for this.");

    if (!req.file) return res.error(400, "Missing avatar in request body.");
    member.avatar = req.file.destination.slice("./public".length) + "/" + req.file.filename;
    res.complate(await member.save());
});


module.exports = app;