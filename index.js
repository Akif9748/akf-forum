const { def_theme, forum_name, desp } = require("./config.json"),
    { UserModel, BanModel } = require("./models"),
    rateLimit = require('express-rate-limit'),
    ipBlock = require('express-ip-block'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    express = require('express'),
    fs = require("fs"),
    app = express();

app.ips = [];

require("dotenv").config();
mongoose.connect(process.env.MONGO_DB_URL,
    async () => console.log("Database is connected with", (app.ips = await BanModel.find({})).length, "banned IPs"));

app.set("view engine", "ejs");

app.use(
    session({ secret: 'secret', resave: true, saveUninitialized: true }),
    express.static("public"), express.json(), ipBlock(app.ips),
    async (req, res, next) => {
        req.user = req.session.userID ? await UserModel.findOneAndUpdate({ id: req.session.userID }, { lastSeen: Date.now() }) : null;

        res.reply = (page, options = {}, status = 200) => res.status(status)
            .render(page, { user: req.user, theme: req.user?.theme || def_theme, forum_name, desp, ...options });

        res.error = (type, error) => res.reply("error", { type, error }, type);

        if (req.user?.deleted) {
            req.session.destroy();
            return res.error(403, "Your account has been deleted.");
        }
        next();
    }, rateLimit({
        windowMs: 60_000, max: 20,
        handler: (req, res, next, opts) => !req.user?.admin ? res.error(opts.statusCode, "You are begin ratelimited") : next()
    }), bodyParser.urlencoded({ extended: true })
);

for (const file of fs.readdirSync("./routes"))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(404, "We have not got this page."));

app.listen(port, () => console.log(forum_name + "-forum on port:", port));