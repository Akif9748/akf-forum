const User = require("./user")

module.exports = class Message {
    constructor(like = true, author = new User()) {
        this.like = like;
        this.author= author;
    }
}