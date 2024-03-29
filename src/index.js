require("dotenv").config();
const
    { def_theme, forum_name, description, limits, global_ratelimit: RLS, discord_auth, host } = require("../config.json"),
    { UserModel, BanModel } = require("./models"),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    express = require('express'),
    fs = require("fs"),
    { join } = require("path"),
    app = express(),
    { mw: IP } = require('request-ip'),
    { RL, themes } = require('./lib'),
    SES = require('express-session'),
    MS = require("connect-mongo"),
    DB = mongoose.connect(process.env.MONGO_DB_URL)
        .then(async m => {
            console.log("Database is connected with", (app.ips = await BanModel.find({})).length, "banned IPs");
            return m.connection.getClient()
        });

app.ips = [];

app.onlines = new Map();

setInterval(() => {
    const now = Date.now();
    for (const [ip, lastSeen] of app.onlines.entries())
        if (now - lastSeen > 1000 * 60 * 5)
            app.onlines.delete(ip);
}, 1000 * 60 * 5);

app.set("view engine", "ejs");
app.set("limits", limits);

for (const theme of themes)
    app.use(`/themes/${theme.codename}`, express.static(join(__dirname, "themes", theme.codename, "public")));

app.use(express.static(join(__dirname, "public")), express.json(), express.urlencoded({ extended: true }), IP(),
    SES({ secret: process.env.SECRET, store: MS.create({ clientPromise: DB, stringify: false }), resave: false, saveUninitialized: false }),
    async (req, res, next) => {
        if (app.ips.includes(req.clientIp)) return res.status(403).send("You are banned from this forum.");
        
        const lastSeen = Date.now();
        
        req.user = req.session.userID ? await UserModel.findOneAndUpdate({ id: req.session.userID }, {
            lastSeen, $addToSet: { ips: req.clientIp }
        }) : null;

        app.onlines.set(req.clientIp, lastSeen);        

        let theme = req.user?.theme || def_theme;

        if (!themes.some(t => t.codename === theme.codename))
            theme = def_theme;

        res.reply = (page, options = {}, status = 200) => {
            const road = join(__dirname, "themes", theme.codename, "views", `${page}.ejs`);
            const renderpage = fs.existsSync(road) ? road : join(__dirname, "themes", def_theme, "views", `${page}.ejs`);
            return res.status(status).render(renderpage, {
                dataset: {
                    themes, theme, forum_name, description,
                    getFile: file => join(__dirname, "themes", file),
                },
                user: req.user,
                ...options
            });
        }

        res.error = (type, error) => res.reply("error", { type, error }, type);

        if (req.user?.deleted) {
            req.session.destroy();
            return res.error(403, "Your account has been deleted.");
        }

        if (req.user && req.user.state == "APPROVAL" && !req.user.admin && !req.url.startsWith("/auth/email")) return res.error(403, "Your account is not approved yet.");

        next();
    }
);

if (RLS.enabled) app.use(RL(RLS.windowMs, RLS.max));

if (discord_auth)
    app.set("DISCORD_AUTH_URL", `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_ID}&redirect_uri=${host}%2Fauth%2Fdiscord&response_type=code&scope=identify`);

for (const file of fs.readdirSync(join(__dirname, "routes")))
    app.use("/" + file.replace(".js", ""), require(`./routes/${file}`));

app.all("*", (req, res) => res.error(404, "This page does not exist on this forum."));

app.listen(port, () => console.log(`${forum_name} on port:`, port));