const { User } = require("../../../classes");
const ApiResponse = require("../ApiResponse");
const { Router } = require("express")

const app = Router();

app.get("/:id", async (req, res) => {

    const error = (status, error) =>
        res.status(status).json(new ApiResponse(status, { error }))


    const { id = null } = req.params;
    if (!id) return error(400, "Missing id in query")
    const member = await new User().getById(id);
    if (!member || member.deleted) return error(404, "We have not got any user declared as this id.");

    res.status(200).json(new ApiResponse(200, member));

});

module.exports = app;