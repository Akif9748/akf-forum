const { def_theme } = require("./config.json"),
    ipBlock = require('express-ip-block'),
    session = require('express-session'),
    { UserModel, BanModel } = require("./models"),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    express = require('express'),
    fs = require("fs"),
    app = express();
app.ips = [];

require("dotenv").config();
mongoose.connect(process.env.MONGO_DB_URL,
    async () => console.log("Connected to mongoDB with", app.ips = await BanModel.find({}).select("ip"), "banned IPs"));

app.set("view engine", "ejs");

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }),
    bodyParser.urlencoded({ extended: true }),
    express.static("public"), express.json(), ipBlock(app.ips),
    async (req, res, next) => {
        req.user = await UserModel.get(req.session.userid);
        res.reply = (page, options = {}, status = 200) => res.status(status)
            .render(page, { user: req.user, theme: req.user?.theme || def_theme, ...options });

        res.error = (type, error) => res.reply("error", { type, error }, type);

        if (req.user?.deleted) {
            req.session.destroy();
            return res.error(403, "Your account has been deleted.");
        }
        next();
    }
);

for (const file of fs.readdirSync("./routes"))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(404, "We have not got this page."));

app.listen(port, () => console.log("akf-forum on port:", port));