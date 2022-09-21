const RL = require('express-rate-limit');

module.exports.RL = (windowMs = 60_000, max = 1) =>
    RL({
        windowMs, max, standardHeaders: true, legacyHeaders: false,
        handler: (req, res, next, opts) => !req.user?.admin ? res.error(opts.statusCode, "You are begin ratelimited") : next()
    })
