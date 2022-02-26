const db = require("quick.db")

module.exports = class User {


    constructor(name = "guest", avatar = "/images/guest.png", time = new Date().getTime()) {

        this.name = name;
        this.avatar = avatar;
        this.time = time;

    }

    getId(id = this.id) {
        const user = db.get("users." + id);
        if (!user) return null;
        this.id = id;
        const { name = "guest", avatar = "/images/guest.png", time = new Date().getTime() } = user;
        this.name = name;
        this.avatar = avatar;
        this.time = time;
        return this
    }
    takeId() {
        let id = db.get("users");
        this.id = id ? id.length : 0;
        return this
    }

    write(id = this.id) {

        db.set("users." + id, this)
    }
    getLink(id = this.id) {
        return "/users/" + id;


    }

}