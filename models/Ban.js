const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    ip: { type: String, unique: true },
    reason: { type: String, default: "No reason given" },
    authorID: { type: String }
});

const model = mongoose.model('ban', schema);
module.exports = model;