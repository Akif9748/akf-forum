const { Router } = require("express")
const { MessageModel, ThreadModel, UserModel } = require("../../../models");

const app = Router();

app.get("/users", async (req, res) => {
    if (!req.query.q) return res.error(400, "Missing query parameter 'q' in request body.");
    const results = await UserModel.find({ name: { $regex: req.query.q, $options: "i" } }).limit(10);
    res.complate(results);
});
app.get("/messages", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = {};
    if (req.query.q) query.content = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const results = await MessageModel.find(query).limit(10);
    res.complate(results);
});
app.get("/threads", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = {};
    if (req.query.q) query.title = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const results = await ThreadModel.find(query).limit(10);
    res.complate(results);
});

module.exports = app;