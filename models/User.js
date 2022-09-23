const mongoose = require("mongoose")
const { def_theme, limits } = require("../config.json");
const schema = new mongoose.Schema({
    id: { type: String, unique: true },
    discordID: { type: String },
    name: { type: String, maxlength: limits.names },
    avatar: { type: String, default: "/images/avatars/default.jpg" },
    time: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    edited: { type: Boolean, default: false },
    about: { type: String, default: "", maxlength: limits.desp },
    admin: { type: Boolean, default: false },
    theme: { type: String, default: def_theme },
    lastSeen: { type: Date, default: Date.now, select: false },
    hideLastSeen: { type: Boolean, default: false },
    ips: { type: [String], default: [], select: false },
    password: { type: String, select: false }
});

schema.methods.takeId = async function () {
    this.id = String(await model.count() || 0);
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/users/" + id;
}

const model = mongoose.model('user', schema);

model.get = (id, select) => model.findOne({ id }).select(select);

module.exports = model;