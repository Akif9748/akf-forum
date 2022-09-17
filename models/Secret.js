const mongoose = require("mongoose")
const { limits } = require("../config.json");

const schema = new mongoose.Schema({
    username: { type: String, unique: true, maxlength: limits.names },
    password: String,
    id: { type: String, unique: true }
});

module.exports = mongoose.model('secret', schema);