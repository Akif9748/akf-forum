const mongoose = require("mongoose")
const UserModel = require("./User");

const schema = new mongoose.Schema({
    id: { type: String, unique: true },

    threadID: String,
    author: UserModel.schema, // user-model

    content: String,
    time: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    react: {
        like: [Number],
        dislike: [Number]
    }

})

schema.virtual('authorID').get(function () { return this.author?.id; });

schema.methods.takeId = async function () {
    this.id = String(await model.count() || 0);
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/messages/" + id;
}

const model = mongoose.model('message', schema);

model.get = id => model.findOne({ id });

module.exports = model;

