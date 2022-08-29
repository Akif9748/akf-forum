const { Router } = require("express")

const app = Router();

app.get("/", async (req, res) => {
    if (!req.user?.admin) return res.error(403, "You have not got permissions for view to this page.");
    res.reply("admin")
});
module.exports = app;