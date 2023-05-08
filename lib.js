const RL = require('express-rate-limit');
const nodemailer = require("nodemailer");
const config = require("./config.json");
const crypto = require("crypto");

require("dotenv").config();
module.exports = {
    threadEnum: ["OPEN", "APPROVAL", "DELETED"],
    userEnum: ["ACTIVE", "APPROVAL", "DELETED", "BANNED"],
    RL(windowMs = 60_000, max = 1) {
        return RL({
            windowMs, max, standardHeaders: true, legacyHeaders: false,
            handler: (req, res, next, opts) => !req.user?.admin ? res.error(opts.statusCode, "You are begin ratelimited") : next()
        })
    },
    getGravatar(email, size) {
        return `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(email).digest("hex")}?d=mp${size ? `&size=${size}` : ''}`;
    },
    // eslint-disable-next-line no-useless-escape
    emailRegEx: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


}

if (config.email_auth)
    module.exports.transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, direct: true, secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
