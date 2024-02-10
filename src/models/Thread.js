const mongoose = require("mongoose");
const cache = require("./cache")
const MessageModel = require("./Message");
const { limits, default_thread_state } = require("../../config.json");
const { threadEnum } = require("../lib");
const schema = new mongoose.Schema({
    id: { type: String, unique: true },

    categoryID: String,
    authorID: {
        type: String, get(v) { return v || this.author?.id }
    },
    author: {
        type: Object, set(v) {
            this.authorID = v.id;
            return v;
        }
    },

    title: { type: String, maxlength: limits.title },
    oldTitles: [String],

    time: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    state: { type: String, default: default_thread_state, enum: threadEnum, uppercase: true },
    messages: [String],
    views: { type: Number, default: 0 }
});


schema.methods.get_author = cache.getAuthor;

schema.virtual("deleted").get(function () {
    return this.state === "DELETED";
}).set(function (value) {
    this.set({ state: value ? "DELETED" : "OPEN" });
});


schema.methods.get_category = async function () {
    return await require("./Category").findOne({ id: this.categoryID }) || { id: this.categoryID, name: "Unknown" };
}
schema.methods.messageCount = async function (admin = false) {
    const query = { threadID: this.id };
    if (!admin) query.deleted = false;
    return await MessageModel.countDocuments(query) || 0;
};

schema.methods.push = function (messageID) {
    this.messages.push(messageID);
    return this;
}

schema.methods.takeId = async function () {    
    // eslint-disable-next-line no-use-before-define
    this.id = await model.countDocuments() || 0;
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/threads/" + id;
}

const model = mongoose.model('thread', schema);

model.get = id => model.findOne({ id }).then(thread => thread.get_author());

module.exports = model;