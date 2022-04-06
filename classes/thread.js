const User = require("./user")

const { ThreadModel } = require("../models");


module.exports = class Thread {

    constructor(title, author = User, messages = [], time = Date.now(), deleted = false) {

        this.author = author;
        this.authorID = author?.id;
        this.title = title;
        this.messages = messages;
        this.time = time;
        this.deleted = deleted;

    }

    async getById(id = this.id) {
        try {
            this.id = Number(id);


            const thread = await ThreadModel.findOne({ id });
            if (!thread) return null;

            const { title, authorID, author, messages = [], time = Date.now(), deleted = false } = thread;
            this.title = title
            this.author = author;
            this.authorID = authorID;
            this.messages = messages;
            this.time = time;
            this.deleted = deleted;

            return this;
        } catch (e) {
            return null;
        }
    }

    push(messageID) {
        this.messages.push(messageID)
        return this;
    }

    async takeId() {
        this.id = await ThreadModel.count({}) || 0;
        return this;
    }
    async write(id = this.id) {
        const writing = await ThreadModel.findOneAndUpdate({ id }, this);

        if (!writing)
            await ThreadModel.create(this);

        return this;
    }


    getLink(id = this.id) {
        return "/threads/" + id;
    }
}