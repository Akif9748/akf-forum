module.exports = (res, type, error) => 
    res.status(type).render("error", { type, error });
