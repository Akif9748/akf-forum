const { TimeoutModel } = require("../models");
module.exports = async (req, res, next) => {
    if (!req.user || req.user.admin) return next();

    const timeout = await TimeoutModel.findOne({ id: req.user.id }) || new TimeoutModel({ until: Date.now() - 1000, id: req.user.id });

    req.timeout = timeout;

    if (timeout.until > Date.now())
        req.ratelimit = true;


    next();

}   