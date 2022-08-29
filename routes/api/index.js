const { Router, request, response } = require("express")
const app = Router();
const bcrypt = require("bcrypt");
const { SecretModel, UserModel } = require("../../models")

/**
 * Auth checker
 * @param {request} req 
 * @param {response} res 
 */

app.use(async (req, res, next) => {
    res.error = (status, error) => res.status(status).json({ error });

    res.complate = result => res.status(200).json(result);

    if (req.user) return next();
    const { username = null, password = null } = req.headers;

    if (!username || !password)
        return res.error(401, "Authorise headers are missing")

    const user = await SecretModel.findOne({ username });

    if (!user)
        return res.error(401, `We don't have any thread with name ${username}.`)

    if (!await bcrypt.compare(password, user.password)) return res.error(401, 'Incorrect Password!');

    req.user = await UserModel.findOne({ name: req.headers.username });

    next();
});

/* will add for loop */
app.use("/messages", require("./routes/messages"))
app.use("/users", require("./routes/users"))
app.use("/threads", require("./routes/threads"))

app.all("*", (req, res) => res.error(400, "Bad request"));

module.exports = app;