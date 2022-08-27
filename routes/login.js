const { UserModel, SecretModel } = require("../models");
const { Router } = require("express");
const app = Router();
const bcrypt = require("bcrypt");

app.get("/", (req, res) => res.reply("login",{redirect: req.query.redirect,user:null}));

app.post("/", async (req, res) => {
    req.session.userid = null;

    const { username = null, password = null } = req.body;

    if (username && password) {
        const user = await SecretModel.findOne({ username });
        if (user) {

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) return res.error( 403, 'Incorrect Password!')
            const member = await UserModel.findOne({ name: username });
            if (!member || member.deleted) return res.error( 403, 'Incorrect Username and/or Password!')

            req.session.userid = user.id;

            res.redirect( req.query.redirect ||  '/');
        } else
        res.error( 403, 'Incorrect Username and/or Password!')


    } else
    res.error( 400, "You forgot entering some values")



})


module.exports = app;