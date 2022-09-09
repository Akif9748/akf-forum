const { CategoryModel } = require("../../../models");
const { Router } = require("express")

const app = Router();

app.use((req, res, next) => {
    if (!req.user.admin) return res.error(403, "You have not got permission for this.");
    next();
});

app.param("id", async (req, res, next, id) => {
    req.category = await CategoryModel.findOne({ id });
    if (!req.category) return res.error(404, `We don't have any category with id ${id}.`);
    next();
});

app.get("/", async (req, res) => {
    const categories = await CategoryModel.find({});
    res.complate(categories);
});

app.get("/:id", async (req, res) => {
    const {category} = req;
    res.complate(category);
});

app.patch("/:id", async (req, res) => {
    const {category} = req;
    if (req.body.name) category.name = req.body.name;
    if (req.body.desp) category.name = req.body.name;
    res.complate(await category.save());
});

app.delete("/:id", async (req, res) => {
    res.complate(await CategoryModel.deleteOne({ id: req.params.id }));
});

app.post("/", async (req, res) => {
    const {name,desp} = req.body;
    if (!name) return res.error(400, "You have to give a name for the category.");

    if (await CategoryModel.exists({ name })) return res.error(400, "This category is already opened.");

    res.complate(await CategoryModel.create({ name, desp, authorID: req.user.id }).then(c => c.takeId()));

});


module.exports = app;