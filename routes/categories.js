const { CategoryModel,ThreadModel } = require("../models");

const { Router } = require("express");

const app = Router();
app.get("/", async (req, res) => {
    const categories = await CategoryModel.find({});
    res.reply("categories", { categories });
});

app.get("/create",(req,res)=>res.reply("create_category"));
app.get("/:id", async (req, res) => {
    const category = await CategoryModel.findOne({ id: req.params.id });
    if (!category) return res.error(404, "Category not found.");
    const page = Number(req.query.page) || 0;
    const query = { categoryID: category.id };
    if (!req.user?.admin) query.deleted= false;

    let threads = await ThreadModel.find(query).limit(10).skip(page * 10);
    threads = await Promise.all(threads.map(thread => thread.get_author()));

    res.reply("threads", { threads, page, title: `Threads in ${category.name}`, desp: category.desp, pages: Math.ceil(await ThreadModel.count(query) / 10) });
});

module.exports = app;