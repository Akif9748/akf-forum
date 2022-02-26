
const User = require("./user")

module.exports = class Message {


    constructor(content, author = new User(), time = new Date().getTime()) {


        this.content = content;
        this.author = author;
        this.time = time;

    }
}