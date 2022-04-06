const { User } = require("../classes");
const { Router } = require("express");
const { SecretModel } = require("../models");
const error = require("../errors/error");
const app = Router();

app.get("/", (req, res) => res.render("login"));

app.post("/", async (req, res) => {
    req.session.userid = null;

    const { username = null, password = null } = req.body;

    if (username && password) {
        const user = await SecretModel.findOne({ username });
        if (user) {
            if (user.password !== password) return error(res, 403, 'Incorrect Password!')
            const member = await new User().getByName(username)
            if (!member || member.deleted) return error(res, 403, 'Incorrect Username and/or Password!')

            req.session.userid = user.id;

            res.redirect('/');
        } else
            error(res, 403, 'Incorrect Username and/or Password!')


    } else
        error(res, 400, "You forgot entering some values")



})


module.exports = app;