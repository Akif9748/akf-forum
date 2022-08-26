const { UserModel, SecretModel } = require("../models");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const rateLimit = require('express-rate-limit')

const app = Router();

app.get("/", (req, res) => res.render("register",{user:null}));

app.post("/", rateLimit({
    windowMs: 24*60*60_000, max: 1, standardHeaders: true, legacyHeaders: false,
    handler: (request, response, next, options) =>
            response.error(options.statusCode, "You are begin ratelimited")
           
}), async (req, res) => {
    req.session.userid = null;


    let { username = null, password = null, avatar } = req.body;

    if (username && password) {
        const user = await SecretModel.findOne({ username });

        if (user)
            res.error(res, 400, `We have got an user named ${username}!`)

        else {


            const user2 = new UserModel({ name: req.body.username, avatar })
            await user2.takeId()
            await user2.save();

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            await SecretModel.create({ username, password, id: user2.id })
            req.session.userid = user2.id;

            res.redirect('/');
        }

    } else
        res.error(res, 400, "You forgot entering some values")


})


module.exports = app;