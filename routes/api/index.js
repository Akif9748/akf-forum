const { Router, request, response } = require("express");
const app = Router();
const fs = require("fs");
const bcrypt = require("bcrypt");
const { SecretModel, UserModel } = require("../../models");

/**
 * Auth checker
 * @param {request} req 
 * @param {response} res 
 */

app.use(async (req, res, next) => {
    res.error = (status, error) => res.status(status).json({ error });

    res.complate = result => res.status(200).json(result);

    if (req.user) return next();
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.error(401, "No authorization header");
    const [username, password] = Buffer.from(authHeader.split(' ')[1], "base64").toString().split(":");

    if (!username || !password)
        return res.error(401, "Authorise headers are missing")

    const user = await SecretModel.findOne({ username });

    if (!user)
        return res.error(401, `We don't have any thread with name ${username}.`)

    if (!await bcrypt.compare(password, user.password)) return res.error(401, 'Incorrect Password!');

    req.user = await UserModel.findOne({ name: req.headers.username });

    next();
});

app.get("/me", (req, res) => res.complate(req.user))

for (const file of fs.readdirSync("./routes/api/routes"))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(400, "Bad request"));

module.exports = app;