const { Router } = require("express")
const fs = require("fs");
const app = Router();

app.use((req, res, next) => {
    if (!req.user.admin)
        return res.error(403, "You have not got permission for this.");
    next();
});

app.get("/", (req, res) => {
    try {
        return res.reply(JSON.parse(fs.readFileSync("./config.json", "utf8")));
    } catch (e) {
        res.error(500, e.message);
    }
});
app.post("/", (req, res) => {
    fs.writeFileSync("./config.json", JSON.stringify(req.body, null, 4));
    require.cache[require.resolve("../config.json")] = require("../../../config.json");
    res.complate(require("../../../config.json"));
});

module.exports = app;