const { Router } = require("express")
const { MessageModel, ThreadModel, UserModel } = require("../../../models");

const app = Router();
app.use((req, res, next) => {
    req.sq = {}
    req.so = {}
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);
    if (!req.user.admin) req.sq.deleted = false;

    if (limit) req.so.limit = limit;
    if (skip) req.so.skip = skip;
    next();
})
app.get("/users", async (req, res) => {
    if (!req.query.q) return res.error(400, "Missing query parameter 'q' in request body.");
    const results = await UserModel.find({ ...req.sq, name: { $regex: req.query.q, $options: "i" } }, null, req.so);
    res.complate(results);
});
app.get("/messages", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = { ...req.sq };
    if (req.query.q) query.content = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const results = await MessageModel.find(query, null, req.so)
    res.complate(results);
});
app.get("/threads", async (req, res) => {
    if (!Object.values(req.query).length) return res.error(400, "Missing query parameters in request body.");
    const query = { ...req.sq };
    if (req.query.q) query.title = { $regex: req.query.q, $options: "i" };
    if (req.query.authorID) query.authorID = req.query.authorID;
    const results = await ThreadModel.find(query, null, req.so)
    res.complate(results);
});

module.exports = app;