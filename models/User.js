const { Schema, model } = require("mongoose")

module.exports = model('user', new Schema({
    id: { type: Number, unique: true },

    name: String,
    avatar: String,
    time: Number,
    deleted: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }

}))