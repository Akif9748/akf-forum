const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");
const session = require('express-session');
const error = require("./errors/error.js")

const app = express();

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//Temp:
app.get("/", (req, res) => res.redirect("/index"));






for (const file of fs.readdirSync("./routes/"))
        app.use(`/${file.replace(".js", "")}`, require(`./routes/${file}`))


app.all("*", (req, res) => error(res, 404, "We have not got this page."))
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("SERVER ON PORT:", port));

