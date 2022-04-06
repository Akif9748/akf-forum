const { Schema, model } = require("mongoose")


module.exports = model('timeout', new Schema({
    id: { type: Number, unique: true },
    until: Number

}))