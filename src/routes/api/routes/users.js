const { UserModel, BanModel } = require("../../../models");
const { Router } = require("express");
const multer = require("multer");
const { themes, emailRegEx } = require("../../../lib")
const app = Router();
const { join } = require("path");
app.param("id", async (req, res, next, id) => {
    if (id === "me") //
        id = req.user.id;

    req.member = await UserModel.get(id, req.user.admin ? "+lastSeen +ips" : "");

    if (!req.member) return res.error(404, `We don't have any user with id ${id}.`);

    if (req.member.deleted && !req.user?.admin)
        return res.error(404, `You do not have permissions to view this user with id ${id}.`);

    next();
});

app.get("/:id", async (req, res) => res.complate(req.member));

app.delete("/:id", async (req, res) => {
    const { user, member } = req;

    if (!user.admin)
        return res.error(403, "You have not got permission for this.");

    if (member.deleted) return res.error(404, `This user is with id ${member.id} already deleted.`);

    member.deleted = true;
    await member.save();

    res.complate(member);
});

app.patch("/:id", async (req, res) => {
    const { user, member } = req;

    if (req.user.id !== member.id && !user.admin) return res.error(403, "You have not got permission for this.");
    if (!Object.keys(req.body).some(Boolean)) return res.error(400, "Missing member informations in request body.");

    const { name, about, admin, deleted, hideLastSeen, theme, email } = req.body;

    if ((admin?.length || "deleted" in req.body) && !req.user.admin) return res.error(403, "You have not got permission for edit 'admin' and 'deleted' information, or bad request.");
    const { names, desp } = req.app.get("limits");

    if (name) {
        if (name.length < 3 || names > 25) return res.error(400, `Username must be between 3 - ${names} characters`);
        member.name = name;
    }

    if (about) {
        if (about.length > desp) return res.error(400, `About must be under ${desp} characters`);
        member.about = about;
    }
    if (theme && themes.some(t => t.codename === theme.codename))
        member.theme = theme;

    if (email) {
        if (!emailRegEx.test(email)) return res.error(400, "E-mail is not valid");
        if (await UserModel.exists({ email })) return res.error(400, "E-mail is already in use");
        member.email = email;
    }

    if (typeof admin === "boolean" || ["false", "true"].includes(admin)) member.admin = admin;
    if (deleted === false) member.deleted = false;

    if (typeof hideLastSeen === "boolean" || ["false", "true"].includes(admin)) member.hideLastSeen = hideLastSeen;

    member.edited = true;

    res.complate(await member.save());

})

app.post("/:id/ban", async (req, res) => {
    if (!req.user.admin) return res.error(403, "You have not got permission for this.");
    const { member } = req;
    for (const ip of member.ips)
        try {
            await BanModel.create({ ip, reason: `Ban for ${member.name}`, authorID: req.user.id });
            req.app.ips.push(ip);
        } catch {
            continue;
        }

    res.complate(member);
});

const storage = multer.diskStorage({
    destination: join(__dirname, "..", "..", "..", "public", "images", "avatars"),
    filename: function (req, _file, cb) {
        cb(null, req.member.id + ".jpg")
    }
})

const upload = multer({ storage })

app.post("/:id/avatar", upload.single('avatar'), async (req, res) => {

    const { member } = req;

    if (req.user.id !== member.id && !req.user.admin) return res.error(403, "You have not got permission for this.");

    if (!req.file) return res.error(400, "Missing avatar in request body.");
    member.avatar = "/images/avatars/" + req.file.filename;
    res.complate(await member.save());
});


module.exports = app;