const { UserModel } = require("../models");

module.exports = async (req, res, next) => {
    res.error = (type, error) => res.status(type).render("error", { type, error });
    req.user = await UserModel.get(req.session.userid);
    next();
}   