const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: { type: String, unique: true },
    desp: String, position: Number,
    id: { type: String, unique: true },
    authorID: { type: String }

});

schema.methods.takeId = async function () {    
    // eslint-disable-next-line no-use-before-define
    this.id = await model.countDocuments() || 0;
    return this;
}

schema.methods.getLink = function (id = this.id) {
    return "/categories/" + id;
}

const model = mongoose.model('category', schema);

module.exports = model;