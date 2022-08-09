const { UserModel, MessageModel, ThreadModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const { id = null } = req.params;
    if (!id) return res.error(400, "Missing id in query")
    const member = await UserModel.get(id);
    if (!member || member.deleted) return res.error(404, "We have not got any user declared as this id.");

    res.complate(member);

});

module.exports = app;