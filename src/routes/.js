const { UserModel, ThreadModel, MessageModel, CategoryModel } = require("../models")
const { Router } = require("express");
const app = Router();

app.get("/", async (req, res) => {

    const [
        categories, users, threads, messages, newestMember, newestMessages, newestThreads, onlineUserCount, onlineUsers
    ] = await Promise.all([
        CategoryModel.count(),
        UserModel.count({ deleted: false }),
        ThreadModel.count({ state: "OPEN" }),
        MessageModel.count({ deleted: false }),
        UserModel.findOne({ deleted: false }, "name id").sort({ time: -1 }),
        MessageModel.find({ deleted: false }).sort({ time: -1 }).limit(10),
        ThreadModel.find({ state: "OPEN" }).sort({ time: -1 }).limit(10),
        UserModel.count({ deleted: false, lastSeen: { $gt: Date.now() - 1000 * 60 * 5 } }),
        UserModel.find({ deleted: false, hideLastSeen: false, lastSeen: { $gt: Date.now() - 1000 * 60 * 5 } }, "name id")
    ])


    res.reply("index", {
        categories, users, threads, messages,
        newestMember, newestMessages, newestThreads,
        onlineUserCount, onlineUsers
    });

});

module.exports = app;