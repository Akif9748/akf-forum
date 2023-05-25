const { UserModel } = require("../models")
const { Router } = require("express");
const app = Router();
const fs = require("fs");

app.use(async (req, res, next) => {
    if (await UserModel.exists({ admin: true })) return res.error(400, "You have already setuped the site.");
    next();
});
app.get("/", async (req, res) => res.reply("setup"))
app.post("/", async (req, res) => {
    let original = {};

    try {
        original = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    } catch (e) {
        try {
            original = JSON.parse(fs.readFileSync("./config.json.example", "utf8"));
        // eslint-disable-next-line no-empty
        } catch (e) { }
    }

    const content = req.body;

    for (const key in content)
        if (key in original && content[key])
            original[key] = content[key];

    fs.writeFileSync("./config.json", JSON.stringify(original, null, 4));
    require.cache[require.resolve("../config.json")] = require("../config.json");
    res.redirect("/register");
})

module.exports = app;