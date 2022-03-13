const db = require("quick.db")

module.exports = class User {


    constructor(name = "guest", avatar = "/images/guest.png", time = new Date().getTime(), admin= false) {

        this.name = name;
        this.avatar = avatar;
        this.time = time;
        this.admin = admin;
    }

    getId(id = this.id) {
        const user = db.get("users." + id);
        if (!user) return null;
        this.id = Number(id);
        const { name = "guest", avatar = "/images/guest.png", time = new Date().getTime(), admin = false } = user;
        this.name = name;
        this.avatar = avatar;
        this.time = time;   
        this.admin = admin;
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