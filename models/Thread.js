const { Schema, model } = require("mongoose")


module.exports = model('thread', new Schema({
    id: { type: Number, unique: true },

    authorID: Number,
    author: Object,

    title: String,
    time: Number,
    deleted: { type: Boolean, default: false },
    messages: [Number]

}))