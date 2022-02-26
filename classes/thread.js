const db = require("quick.db")
const User = require("./user")

module.exports = class Thread {

    constructor(title, content, author = new User(), messages = [], time = new Date().getTime()) {

        this.content = content;
        this.author = author;
        this.title = title;
        this.messages = messages;
        this.time = time;

    }

    getId(id = this.id) {
        const thread = db.get("threads."+id);
        if (!thread) return null;
        this.id = id;
        const { content, title, author, messages = [], time = new Date().getTime() } = thread;
        this.content = content
        this.title = title
        this.author = author
        this.messages = messages;
        this.time = time;

        return this
    }
    takeId(){


        this.id = db.get("threads").length;
        return this
    }

    push(message){
        this.messages.push(message)
        return this;
    }
    write(id = this.id) {

        db.set("threads."+id, this)
    }
    getLink(id = this.id) {
        return "/threads/" + id;


    }
}