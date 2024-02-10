const { UserModel, ThreadModel, MessageModel } = require("../models")
const { Router } = require("express");

const app = Router();

app.get("/", (req, res) => res.reply("search"));

app.use(async (req, res, next) => {
    req.sq = {}
    req.page = Number(req.query.page) || 0;
    req.so = { limit: 10, skip: req.page * 10 }
    if (!req.user?.admin) req.sq.deleted = false;

    next();
});

app.get("/users", async (req, res) => {
    if (!req.query.q) return res.error(400, "Missing query parameter 'q' in request body.");
    const users = await UserModel.find({ ...req.sq, name: { $regex: req.query.q, $options: "i" } }, null, req.so)
    res.reply("users", {
        users, page: req.page,
        pages: Math.ceil(await UserModel.countDocuments(req.sq) / 10)
    });
});

app.get("/messages", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = { ...req.sq };
    if (req.query.q) query.content = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const messages = await MessageModel.find(query, null, req.so)
    res.reply("messages", {
        messages, page: req.page,
        pages: Math.ceil(await MessageModel.countDocuments(query) / 10)
    });
});

app.get("/threads", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = {};
    if (!req.user?.admin) query.state = "OPEN";

    if (req.query.q) query.title = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const threads = await ThreadModel.find(query, null, req.so)
    res.reply("threads", {
        threads, page: req.page, title: `Threads with query '${req.query.q}'`,
        pages: Math.ceil(await ThreadModel.countDocuments(query) / 10), desp: `${threads.length} threads are listed`
    });
});

module.exports = app;

