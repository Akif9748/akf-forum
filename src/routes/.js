const { UserModel, ThreadModel, MessageModel, CategoryModel } = require("../models");
const { Router } = require("express");
const app = Router();

app.get("/", async (req, res) => {

    const [
        categories, users, threads, messages, newestMember, newestMessages, newestThreads, onlineMemberCount, onlineMembers
    ] = await Promise.all([
        CategoryModel.countDocuments(),
        UserModel.countDocuments({ deleted: false }),
        ThreadModel.countDocuments({ state: "OPEN" }),
        MessageModel.countDocuments({ deleted: false }),
        UserModel.findOne({ deleted: false }, "name id").sort({ time: -1 }),
        MessageModel.find({ deleted: false }).sort({ time: -1 }).limit(10),
        ThreadModel.find({ state: "OPEN" }).sort({ time: -1 }).limit(10),
        UserModel.countDocuments({ deleted: false, lastSeen: { $gt: Date.now() - 1000 * 60 * 5 } }),
        UserModel.find({ deleted: false, hideLastSeen: false, lastSeen: { $gt: Date.now() - 1000 * 60 * 5 } }, "name id")
    ]),
        onlineTotal = req.app.onlines.size,
        onlineGuests = onlineTotal - onlineMemberCount;

    res.reply("index", {
        categories, users, threads, messages,
        newestMember, newestMessages, newestThreads,
        onlineMemberCount, onlineMembers, onlineGuests, onlineTotal
    });

});

module.exports = app;