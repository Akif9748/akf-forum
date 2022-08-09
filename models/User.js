const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    id: { type: String, unique: true },

    name: String,
    avatar: { type: String, default: "/images/guest.png" },
    time: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }

});


schema.methods.takeId = async function () {
    this.id = String(await model.count() || 0);
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/users/" + id;
}

const model = mongoose.model('user', schema);

model.get = id => model.findOne({ id });

module.exports = model;