const { Router } = require("express")
const app = Router();


const { request, response } = require("express");
const { SecretModel } = require("../../models")
const ApiResponse = require("./ApiResponse")
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
    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }))

    const { username = null, password = null } = req.headers;

    if (!username || !password)
        return error(401, "Authorise headers are missing")

    const user = await SecretModel.findOne({ username });

    if (!user)
        return error(401, "We have not got any user has got this name")

    if (user.password !== password)
        return error(401, 'Incorrect Password!')
    next();
});

app.use("/messages", require("./routes/message"))
app.use("/users", require("./routes/user"))
app.use("/threads", require("./routes/threads"))

app.all("*", (req, res) => res.status(400).json(new ApiResponse(400, { error: "Bad request" })));

module.exports = app;