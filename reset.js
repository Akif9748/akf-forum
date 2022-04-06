const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/akf-forum', () => console.log("Database is connected"));

const { SecretModel, UserModel, MessageModel, ThreadModel } = require("./models");
(async () => {

    await UserModel.deleteMany({});
    await ThreadModel.deleteMany({});
    await MessageModel.deleteMany({});
    await SecretModel.deleteMany({});
    console.log("Success")
})();


