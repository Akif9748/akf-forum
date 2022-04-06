const { MessageModel } = require("../models");
const User = require("./user");

module.exports = class Message {


    constructor(content, author = User, threadID = null, time = Date.now(), deleted = false, edited = false, react = {}) {

        this.authorID = author?.id;
        this.content = content;
        this.author = author;
        this.time = time;
        this.threadID = threadID;
        this.deleted = deleted;
        this.edited = edited;
        this.react = react;

    }
    async getById(id = this.id) {
        this.id = Number(id);

        const message = await MessageModel.findOne({ id });
        if (!message) return null;

        const { content, authorID, author = null, threadID = null, time = Date.now(), deleted = false, edited = false, react = {} } = message;
        this.content = content;
        this.threadID = threadID;
        this.author = author;
        this.authorID = authorID;
        this.time = time;
        this.deleted = deleted;
        this.edited = edited;
        this.react = react;
        return this;
    }

    async takeId() {
        this.id = await MessageModel.count({}) || 0;
        return this;
    }
    async write(id = this.id) {
        const writing = await MessageModel.findOneAndUpdate({ id }, this);

        if (!writing)
            await MessageModel.create(this);

        return this;
    }

    getLink(id = this.id) {
        return "/messages/" + id;
    }
}