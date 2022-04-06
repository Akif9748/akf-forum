const { UserModel } = require("../models");

module.exports = class User {


    constructor(name = "guest", avatar = "/images/guest.png", time = Date.now(), admin = false, deleted = false) {

        this.name = name;
        this.avatar = avatar;
        this.time = time;
        this.admin = admin;
        this.deleted = deleted;

    }

    async getById(id = this.id) {
        this.id = Number(id);
        const user = await UserModel.findOne({ id });
        if (!user) return null;

        const { name = "guest", avatar = "/images/guest.png", time = Date.now(), admin = false, deleted = false } = user;
        this.name = name;
        this.avatar = avatar;
        this.time = time;
        this.admin = admin;
        this.deleted = deleted;
        return this;

    }

    async getByName(Name = this.name) {
          
        const user = await UserModel.findOne({ name: Name });
        if (!user) return null;

        const { name = "guest", avatar = "/images/guest.png", time = Date.now(), admin = false, deleted = false } = user;
        this.name = name;
        this.avatar = avatar;
        this.time = time;
        this.admin = admin;
        this.deleted = deleted;
        return this;

    }

    async takeId() {
        this.id = await UserModel.count({}) || 0;
        return this;
    }

    async write(id = this.id) {
        const writing = await UserModel.findOneAndUpdate({ id }, this);

        if (!writing)
            await UserModel.create(this);

        return this;
    }

    getLink(id = this.id) {
        return "/users/" + id;
    }

}