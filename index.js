const { urlencoded: BP } = require('body-parser'),
    { mw: IP } = require('request-ip'),
    RL = require('express-rate-limit'),
    SES = require('express-session');

const
    { def_theme, forum_name, description, limits, global_ratelimit: RLS, discord_auth, host } = require("./config.json"),
    { UserModel, BanModel } = require("./models"),
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
app.set("limits", limits);

app.use(express.static("public"), express.json(), IP(),
    SES({ secret: 'secret', resave: true, saveUninitialized: true }),
    async (req, res, next) => {
        if (app.ips.includes(req.clientIp)) return res.status(403).send("You are banned from this forum.");

        req.user = req.session.userID ? await UserModel.findOneAndUpdate({ id: req.session.userID }, {
            lastSeen: Date.now(), $addToSet: { ips: req.clientIp }
        }) : null;
        res.reply = (page, options = {}, status = 200) => res.status(status)
            .render(page, { user: req.user, theme: req.user?.theme || def_theme, forum_name, description, ...options });

        res.error = (type, error) => res.reply("error", { type, error }, type);

        if (req.user?.deleted) {
            req.session.destroy();
            return res.error(403, "Your account has been deleted.");
        }
        next();
    }, BP({ extended: true })
);

if (discord_auth)
    app.set("discord_auth", `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT}&redirect_uri=${host}%2Fdiscord_auth%2Fhash&response_type=token&scope=identify`);

if (RLS.enabled)
    app.use(RL({ ...RLS, handler: (req, res, next, opts) => !req.user?.admin ? res.error(opts.statusCode, "You are begin ratelimited") : next() }));

for (const file of fs.readdirSync("./routes"))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(404, "We have not got this page."));

app.listen(port, () => console.log(`${forum_name}-forum on port:`, port));