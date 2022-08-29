const mongoose = require("mongoose");
const UserModel = require("./User");
const MessageModel = require("./Message");
const schema = new mongoose.Schema({
    id: { type: String, unique: true },

    author: UserModel.schema,

    title: String,
    time: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },

    messages: [String],
    views: { type: Number, default: 0 }

});

schema.virtual('authorID').get(function () { return this.author?.id; });
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

model.get = id => model.findOne({ id });

module.exports = model;