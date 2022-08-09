const { Router } = require("express")
const app = Router();
const bcrypt = require("bcrypt");

const { request, response } = require("express");
const { SecretModel, UserModel } = require("../../models")

/**
 * AUTH TYPE:
 
 headers: 
    {
        username: "Username for client",
        password: "Password of selected username for client"
    }

*/

/**
  * REQUEST TYPE:
  * GET /api/action/id 
  * 
  * @example message action:
  * GET /api/message/0
  *  
  */


/**
 * Auth checker
 * @param {request} req 
 * @param {response} res 
 */

app.use(async (req, res, next) => {
    res.error = (status, error) =>
        res.status(status).json({ status, result: { error } })

    res.complate = result => res.status(200).json({ status: 200, result });

    const { username = null, password = null } = req.headers;

    if (!username || !password)
        return res.error(401, "Authorise headers are missing")

    const user = await SecretModel.findOne({ username });

    if (!user)
        return res.error(401, "We have not got any user has got this name")

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
        return res.error(401, 'Incorrect Password!')
    req.user = await UserModel.findOne({ name: req.headers.username });

    next();
});

/* will add for loop */
app.use("/messages", require("./routes/message"))
app.use("/users", require("./routes/user"))
app.use("/threads", require("./routes/threads"))

app.all("*", (req, res) => res.error(400, "Bad request"));

module.exports = app;