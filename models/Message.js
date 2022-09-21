const mongoose = require("mongoose");
const cache = require("./cache");
const { limits } = require("../config.json");

const schema = new mongoose.Schema({
    id: { type: String, unique: true },
    author: Object,
    threadID: String,
    authorID: String,
    content: { type: String, maxlength: limits.message },
    oldContents: [{ type: String, maxlength: limits.message }],
    time: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    react: {
        like: [Number],
        dislike: [Number]
    }
})

schema.methods.get_author = cache.getAuthor

schema.methods.takeId = async function () {
    this.id = String(await model.count() || 0);
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/messages/" + id;
}

const model = mongoose.model('message', schema);

model.get = async id => {
    const message = await model.findOne({ id })
    return await message.get_author();
};

module.exports = model;