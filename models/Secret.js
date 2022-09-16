const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username: { type: String, unique: true, maxlength: 25 },
    password: String,
    id: { type: String, unique: true }
});

module.exports = mongoose.model('secret', schema);