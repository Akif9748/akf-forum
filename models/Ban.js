const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    ip: { type: String, unique: true }
});

module.exports = mongoose.model('ban', schema);