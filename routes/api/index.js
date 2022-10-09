const { Router } = require("express");
const app = Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const { UserModel } = require("../../models");


app.use(async (req, res, next) => {
    res.error = (status, error) => res.status(status).json({ error });
    res.complate = result => res.status(200).json(result);

    if (req.user) return next();
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.error(401, "No authorization header");
    const [name, password] = Buffer.from(authHeader.split(' ')[1], "base64").toString().split(":");

    if (!name || !password)
        return res.error(400, "Authorise headers are not well formed");

    const user = await UserModel.findOne({ name });

    if (!user || user.deleted) return res.error(401, `We don't have any user with name ${name}.`)
    if (!user.active) return res.error(401, "Your account is not approved yet.");

    if (!await bcrypt.compare(password, user.password)) return res.error(401, 'Incorrect Password!');

    req.user = user;

    next();
});

app.get("/me", (req, res) => res.complate(req.user))

for (const file of fs.readdirSync("./routes/api/routes"))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(400, "Bad request"));

module.exports = app;