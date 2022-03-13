
const User = require("./user")
const Thread = require("./thread")
const db = require("quick.db");
module.exports = class Message {


    constructor(content, author = new User(), thread = new Thread(), time = new Date().getTime(), deleted = false, edited = false, react = {}) {


        this.content = content;
        this.author = author;
        this.time = time;
        this.thread = thread;
        this.deleted = deleted;
        this.edited = edited;
        this.react = react;
    }
    getId(id = this.id) {
        const message = db.get("messages" ).find(msg => msg.id == id);
        if (!message) return null;

        this.id = id;
        const { content, author, thread = new Thread(), time = new Date().getTime(), deleted = false, edited = false, react = {} } = message;
        this.content = content;
        this.thread = thread;
        this.author = author;
        this.time = time;
        this.deleted = deleted;
        this.edited = edited;
        this.react = react;
        return this
    }
    takeId() {
        this.id = db.get("messages").length || 0;
        return this;
    }
    write(id = this.id) {
        db.set("messages." + id, this)
        return this;
    }
    getLink(id = this.id) {
        return "/messages/" + id;
    }
}