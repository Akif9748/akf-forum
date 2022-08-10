const session = require('express-session'),
        bodyParser = require('body-parser'),
        port = process.env.PORT || 3000,
        mongoose = require("mongoose"),
        express = require('express'),
        fs = require("fs"),
        app = express();

require("dotenv").config();
mongoose.connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017/akf-forum", () => console.log("Database is connected"));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(require("./middlewares/user"));

for (const file of fs.readdirSync("./routes"))
        app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.status(404).render("error", { type: 404, error: "We have not got this page." }));

app.listen(port, () => console.log("akf-forum on port:", port));