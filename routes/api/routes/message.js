const { User, Message, Thread } = require("../../../classes");
const ApiResponse = require("../ApiResponse");

const { Router } = require("express")

const app = Router();

app.get("/:id", (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));

    const { id = null } = req.params;
    if (!id) return error(400, "Missing id in query")
    const message = new Message().getId(id);

    if (!message || message.deleted) return error(404, "We have not got any message declared as this id.");

    res.status(200).json(new ApiResponse(200, message));

})

app.post("/", (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));
    const { threadID = null, content = null } = req.body;
    const thread = new Thread().getId(threadID);

    if (!content) return error(400, "Missing message content in request body.");
    if (!thread) return error(404, "We have not got this thread.");


    const message = new Message(content, new User().getName(req.headers.username), thread).takeId().write();
    thread.push(message.id).write();

    res.status(200).json(new ApiResponse(200, message));

})

module.exports = app;