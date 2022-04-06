const { Schema, model } = require("mongoose")

module.exports = model('secret', new Schema({

    username: { type: String, unique: true },
    password: String,
    id: { type: Number, unique: true }


}))