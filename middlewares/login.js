module.exports = (req, res) => {
    if (!req.session.loggedin) return res.redirect('/login');
}   