const { Thread, User, Message } = require("../../../classes");
const ApiResponse = require("../ApiResponse");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }))


    const { id = null } = req.params;
    if (!id) return error(400, "Missing id in query")

    const thread = await new Thread().getById(id);
    if (!thread || thread.deleted) return error(404, "We have not got any thread declared as this id.");

    res.status(200).json(new ApiResponse(200, thread));

});


app.post("/", async (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }));

    const { title = null, content = null } = req.body;

    if (!content || !title) return error(400, "Missing content/title in request body.");

    const user = await new User().getByName(req.headers.username)
    const thread = await new Thread(title, user).takeId()
    const message = await new Message(content, user, thread.id).takeId()
    thread.push(message.id).save();
    await message.save();

    res.status(200).json(new ApiResponse(200, thread));

});

module.exports = app;