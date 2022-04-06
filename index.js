const error = require("./errors/error.js"),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        port = process.env.PORT ?? 3000,
        mongoose = require("mongoose"),
        express = require('express'),
        fs = require("fs"),
        app = express();

mongoose.connect('mongodb://localhost:27017/akf-forum', () =>console.log("Database is connected"));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(require("./middlewares/user"));
app.use(require("./middlewares/timeout"));

for (const file of fs.readdirSync("./routes"))
        app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => error(res, 404, "We have not got this page."));

app.listen(port, () => console.log("Akf-forum on port:", port));