const { UserModel, ThreadModel, MessageModel } = require("../models")
const { Router } = require("express");
const app = Router();
const fs = require("fs");

app.get("/", async (req, res) => {

    const
        mem = process.memoryUsage().heapUsed / Math.pow(2, 20),
        users = await UserModel.count({ deleted: false }),
        threads = await ThreadModel.count({ state: "DELETED"}),
        messages = await MessageModel.count({ deleted: false });

    res.reply("index", { mem, users, threads, messages })

})

app.get("/setup", async (req, res) => {
    if (await UserModel.exists({ admin: true })) return res.error(400, "You have already setuped the site.");
    res.reply("setup");
})
app.post("/setup", async (req, res) => {
    if (await UserModel.exists({ admin: true })) return res.error(400, "You have already setuped the site.");
    let original = {};

    try {
        original = JSON.parse(fs.readFileSync("./config.json", "utf8"));
    } catch (e) {
        try {
            original = JSON.parse(fs.readFileSync("./config.json.example", "utf8"));
        } catch (e) { }
    }

    const content = req.body;

    for (const key in content)
        if (key in original && content[key])
            original[key] = content[key];

    fs.writeFileSync("./config.json", JSON.stringify(original,null,4));
    require.cache[require.resolve("../config.json")] = require("../config.json");
    res.redirect("/register");
})

module.exports = app;