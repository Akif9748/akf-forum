const { User, Message, Thread } = require("../../classes");
const db = require("quick.db");
const { Router } = require("express")
const app = Router();

class ApiResponse {
    constructor(status, result) {
        this.status = status;
        this.result = result;
    }
}

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

app.get("/message/:id", (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));



    const { id = null } = req.params;
    if (!id) return error(400, "Missing id in query")
    const message = new Message().getId(id);

    if (!message || message.deleted) return error(404, "We have not got any message declared as this id.");

    res.status(200).json(new ApiResponse(200, message));



})

app.post("/message/", (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));
    const { threadID = null, content = null } = req.body;
    const thread = new Thread().getId(threadID);
    if (!req.body.content) return error(400, "Missing message content in request body.");
    if (!thread) return error(404, "We have not got this thread.");


    const message = new Message(content, new User().getName(req.headers.username), thread).takeId().write();
    thread.push(message.id).write();
   
    res.status(200).json(new ApiResponse(200, message));

})
app.get("/user/:id", (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }))


    const { id = null } = req.params;
    if (!id) return error(400, "Missing id in query")
    const member = new User().getId(id);
    if (!member || member.deleted) return error(404, "We have not got any user declared as this id.");

    res.status(200).json(new ApiResponse(200, member));

});

app.all("*", (req, res) => res.status(400).json(new ApiResponse(400, { error: "Bad request" })));

module.exports = app;