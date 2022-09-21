const mongoose = require("mongoose");
const cache = require("./cache")
const MessageModel = require("./Message");
const { limits, defaultThreadState } = require("../config.json");
const { threadEnum } = require("../lib");
const schema = new mongoose.Schema({
    id: { type: String, unique: true },

    categoryID: String,
    authorID: String,
    author: Object,

    title: { type: String, maxlength: limits.title },
    oldTitles: [String],

    time: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    state: { type: String, default: defaultThreadState, enum: threadEnum },
    messages: [String],
    views: { type: Number, default: 0 }

});


schema.methods.get_author = cache.getAuthor;
schema.methods.get_category = async function () {
    return await require("./Category").findOne({ id: this.categoryID }) || { id: this.categoryID, name: "Unknown" };
}
schema.methods.messageCount = async function (admin = false) {
    const query = { threadID: this.id };
    if (!admin) query.deleted = false;
    return await MessageModel.count(query) || 0;
};

schema.methods.push = function (messageID) {
    this.messages.push(messageID);
    return this;
}

schema.methods.takeId = async function () {
    this.id = await model.count() || 0;
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/threads/" + id;
}

const model = mongoose.model('thread', schema);

model.get = async id => {
    const thread = await model.findOne({ id })
    return await thread.get_author();
};

module.exports = model;