const mongoose = require("mongoose")
const { def_theme, limits, email_auth, default_user_state } = require("../config.json");
const { userEnum } = require("../lib");

const schema = new mongoose.Schema({
    id: { type: String, unique: true },
    discordID: { type: String },
    name: { type: String, maxlength: limits.names },
    avatar: { type: String, default: "/images/avatars/default.jpg" },
    time: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
    about: { type: String, default: "", maxlength: limits.desp },
    admin: { type: Boolean, default: false },
    theme: { type: String, default: def_theme },
    lastSeen: { type: Date, default: Date.now, select: false },
    hideLastSeen: { type: Boolean, default: false },
    ips: { type: [String], default: [], select: false },
    password: { type: String, select: false },
    discord_code: { type: String, select: false },
    state: { type: String, default: default_user_state, enum: userEnum, uppercase: true },
    email: { type: String, select: false },
    email_code: { type: String, select: false },
});

schema.virtual("deleted").get(function () {
    return this.state === "DELETED";
}).set(function (value) {
    this.set({ state: value ? "DELETED" : "ACTIVE" });
});
schema.virtual("active").get(function () {
    return this.state === "ACTIVE";
})

schema.methods.takeId = async function () {
    this.id = String(await model.count() || 0);
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/users/" + id;
}

const model = mongoose.model('user', schema);

model.get = (id, select = "") => model.findOne({ id }, select);

module.exports = model;