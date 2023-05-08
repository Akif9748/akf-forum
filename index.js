require("dotenv").config();
const
    { def_theme, forum_name, description, limits, global_ratelimit: RLS, discord_auth, host } = require("./config.json"),
    { UserModel, BanModel } = require("./models"),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    express = require('express'),
    fs = require("fs"),
    app = express(),
    { mw: IP } = require('request-ip'),
    { RL } = require('./lib'),
    SES = require('express-session'),
    MS = require("connect-mongo"),
    DB = mongoose.connect(process.env.MONGO_DB_URL)
        .then(async m => {
            console.log("Database is connected with", (app.ips = await BanModel.find({})).length, "banned IPs");
            return m.connection.getClient()
        });

app.ips = [];

app.set("view engine", "ejs");
app.set("limits", limits);

app.use(express.static("public"), express.json(), express.urlencoded({ extended: true }), IP(),
    SES({ secret: process.env.SECRET, store: MS.create({ clientPromise: DB, stringify: false }), resave: false, saveUninitialized: false }),
    async (req, res, next) => {
        if (app.ips.includes(req.clientIp)) return res.status(403).send("You are banned from this forum.");

        req.user = req.session.userID ? await UserModel.findOneAndUpdate({ id: req.session.userID }, {
            lastSeen: Date.now(), $addToSet: { ips: req.clientIp }
        }) : null;


        res.reply = (page, options = {}, status = 200) => res.status(status).render(page, {
            user: req.user,
            theme: req.user?.theme || def_theme,
            lang: req.user?.theme?.language || def_theme.language,
            forum_name, description, ...options
        });


        res.error = (type, error) => res.reply("error", { type, error }, type);

        if (req.user?.deleted) {
            req.session.destroy();
            return res.error(403, "Your account has been deleted.");
        }

        if (req.user && req.user.state == "APPROVAL" && !req.user.admin && !req.url.startsWith("/auth/email")) return res.error(403, "Your account is not approved yet.");

        next();
    }
);

if (discord_auth)
    app.set("discord_auth", `https://discord.com/api/oauth2/authorize?client_id=${discord_auth}&redirect_uri=${host}%2Fauth%2Fdiscord&response_type=code&scope=identify`);

if (RLS.enabled) app.use(RL(RLS.windowMs, RLS.max));

for (const file of fs.readdirSync("./routes"))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(404, "This page does not exist on this forum."));

app.listen(port, () => console.log(`${forum_name}-forum on port:`, port));