const { User } = require("../classes");

module.exports = async (req, res, next) => {
    req.user = await new User().getById(req.session.userid);
    next();
}   