const { UserModel, MessageModel, ThreadModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const { id = null } = req.params;
    if (!id) return res.error(400, "Missing id in query")

    const thread = await ThreadModel.get(id);
    if (thread && (req.user?.admin || !thread.deleted))
        res.complate( thread);
    else
        return res.error(404, "We have not got any thread declared as this id.");


});


app.post("/", async (req, res) => {

    const { title = null, content = null } = req.body;

    if (!content || !title) return res.error(400, "Missing content/title in request body.");

    const user = req.user;
    const thread = await new ThreadModel({ title, author: user }).takeId()
    const message = await new MessageModel({ content, author: user, threadID: thread.id }).takeId()
    await thread.push(message.id).save();
    await message.save();

    res.complate(thread);

});

app.post("/:id/delete", async (req, res) => {
    const thread = await ThreadModel.get(req.params.id);
    if (!thread || thread.deleted) return res.error( 404, "We have not got any thread declared as this id.");
    const user = req.user;
    if (user.id != thread.authorID && !user.admin)
        return res.error( 403, "You have not got permission for this.");

    thread.deleted = true;
    await thread.save();

    res.complate(thread);

})

module.exports = app;