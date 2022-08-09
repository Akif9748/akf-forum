const { UserModel, SecretModel } = require("../models");
const { Router } = require("express")
const error = require("../errors/error")

const app = Router();

app.get("/", (req, res) => res.render("register"));

app.post("/", async (req, res) => {
    req.session.userid = null;


    let { username = null, password = null, avatar } = req.body;

    if (username && password) {
        const user = await SecretModel.findOne({ username });

        if (user)
            error(res, 400, `We have got an user named ${username}!`)

        else {


            const user2 = new UserModel({ name: req.body.username, avatar })
            await user2.takeId()
            await user2.save();
            await SecretModel.create({ username, password, id: user2.id })
            req.session.userid = user2.id;

            res.redirect('/');
        }

    } else
        error(res, 400, "You forgot entering some values")


})


module.exports = app;