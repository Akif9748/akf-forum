const { User } = require("../classes");
const { SecretModel } = require("../models");

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

            if (!avatar) avatar ="/images/guest.png";
            
            const user2 = await new User(req.body.username, avatar).takeId();

            await SecretModel.create({ username, password, id: user2.id })
            req.session.userid = user2.id;

            user2.write();

            res.redirect('/');
        }

    } else
        error(res, 400, "You forgot entering some values")


})


module.exports = app;