module.exports = (req, res, next) => {
    if (!req.session.userid) return res.redirect('/login');
    next();
}   