const { UserModel, ThreadModel, MessageModel } = require("../models")
const { Router } = require("express");

const app = Router();

app.get("/", (req, res) => res.reply("search"));

app.get("/users", async (req, res) => {
    if (!req.query.q) return res.error(400, "Missing query parameter 'q' in request body.");
    const users = await UserModel.find({ name: { $regex: req.query.q, $options: "i" } }).limit(10);
    res.reply("users", { users, page: null });
});
app.get("/messages", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = {};
    if (req.query.q) query.content = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const messages = await MessageModel.find(query).limit(10);
    res.reply("messages",{messages});
});
app.get("/threads", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = {};
    if (req.query.q) query.title = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const threads = await ThreadModel.find(query).limit(10);
    res.reply("threads", { threads, page: null });
});

module.exports = app;

