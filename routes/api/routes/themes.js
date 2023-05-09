const  {themes}= require("../../../lib");
const { Router } = require("express")

const app = Router();

app.get("/", async (req, res) => res.complate(themes));

app.get("/:codename", async (req, res) => {
    const theme = themes.find(t => t.codename === req.params.codename);
    if (!theme) return res.error(404, "Theme not found.");
    res.complate(theme);
});


module.exports = app;