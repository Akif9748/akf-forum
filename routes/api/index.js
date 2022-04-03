const { User, Message, Thread } = require("../../classes");
const db = require("quick.db");
const { Router } = require("express")
const app = Router();


const { request, response } = require("express");


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
 * For intellisense
 * @param {request} req 
 * @param {response} res 
 */

app.use((req, res, next) => {
    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }))

    const { username = null, password = null } = req.headers;

    if (!username || !password)
        return error(401, "Headers are missing")

    const user = db.get("secret." + username);

    if (!user)
        return error(401, "We have not got any user has got this name")

    if (user.key !== password)
        return error(401, 'Incorrect Password!')
    next();
})

app.use("/messages", require("./routes/message"))
app.use("/users", require("./routes/user"))
app.use("/threads", require("./routes/threads"))

app.all("*", (req, res) => res.status(400).json(new ApiResponse(400, { error: "Bad request" })));

module.exports = app;