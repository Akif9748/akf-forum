const db = require("quick.db")
const User = require("./user")




module.exports = class Thread {

    constructor(title, author = new User(), messages = [], time = new Date().getTime(),deleted = false) {

        this.author = author;
        this.title = title;
        this.messages = messages;
        this.time = time;
        this.deleted = deleted;

    }

    getId(id = this.id) {
        const thread = db.get("threads").find(t => t.id == id);
        if (!thread) return null;
        this.id = id;
        const { title, author, messages = [], time = new Date().getTime(), deleted = false } = thread;
        this.title = title
        this.author = author
        this.messages = messages;
        this.time = time;
        this.deleted = deleted;

        return this;
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
        return this;
    }
    getLink(id = this.id) {
        return "/threads/" + id;


    }
}