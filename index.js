const error = require("./errors/error.js");
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require("fs");
const app = express();

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

for (const file of fs.readdirSync("./routes"))
        app.use("/" + file.slice(0, -3), require(`./routes/${file}`));

app.all("*", (req, res) => error(res, 404, "We have not got this page."));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Akf-forum on port:", port));