const { Schema, model } = require("mongoose")

const schema = new Schema({

    username: { type: String, unique: true },
    password: String,
    id: { type:String, unique: true }


});

module.exports = model('secret', schema);