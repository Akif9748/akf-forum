const { User, Message, Thread } = require("../../../classes");
const ApiResponse = require("../ApiResponse");

const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));

    const { id = null } = req.params;
    if (!id) return error(400, "Missing id in query")
    const message = await new Message().getById(id);

    if (!message || message.deleted) return error(404, "We have not got any message declared as this id.");

    res.status(200).json(new ApiResponse(200, message));

})

app.post("/", async (req, res) => {
    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));
    const { threadID = null, content = null } = req.body;
    const thread = await new Thread().getById(threadID);

    if (!content) return error(400, "Missing message content in request body.");
    if (!thread) return error(404, "We have not got this thread.");


    const message = await new Message(content, await new User().getByName(req.headers.username), thread.id).takeId()
    message.write();
    thread.push(message.id).write();

    res.status(200).json(new ApiResponse(200, message));

})

module.exports = app;