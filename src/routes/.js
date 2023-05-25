const { UserModel, ThreadModel, MessageModel, CategoryModel } = require("../models")
const { Router } = require("express");
const app = Router();

app.get("/", async (req, res) => {

    const categories = await CategoryModel.count(),
        users = await UserModel.count({ deleted: false }),
        threads = await ThreadModel.count({ state: "OPEN" }),
        messages = await MessageModel.count({ deleted: false }),
        newestMember = await UserModel.findOne({ deleted: false }, "name").sort({ time: -1 });

    res.reply("index", { categories, users, threads, messages, newestMember: newestMember.name });

});

module.exports = app;