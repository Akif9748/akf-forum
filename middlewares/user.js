const { UserModel } = require("../models");

module.exports = async (req, res, next) => {
    req.user = await UserModel.get(req.session.userid);
    next();
}   