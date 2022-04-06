const { Schema, model } = require("mongoose")

module.exports = model('message', new Schema({
    id: { type: Number, unique: true },

    authorID: Number,
    threadID: Number,
    author: Object,
    
    content: String,
    time: Number,
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    messages: [Number],
    react: Object

}))