const error = require("./errors/error.js"),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        port = process.env.PORT ?? 3000,
        express = require('express'),
        fs = require("fs"),
        app = express();

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

for (const file of fs.readdirSync("./routes"))
        app.use("/" + file.slice(0, -3), require(`./routes/${file}`));

app.all("*", (req, res) => error(res, 404, "We have not got this page."));

app.listen(port, () => console.log("Akf-forum on port:", port));