const { Router } = require("express");

const app = Router();

app.get("/", (req, res, next) => {
    if (!req.session.loggedin) return res.redirect('/login');
    next();
});

module.exports = app;