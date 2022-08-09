const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL, () => console.log("Database is connected"));

const { SecretModel, UserModel, MessageModel, ThreadModel } = require("../models");
(async () => {

    await UserModel.deleteMany({});
    await ThreadModel.deleteMany({});
    await MessageModel.deleteMany({});
    await SecretModel.deleteMany({});
    console.log("Success")
})();


