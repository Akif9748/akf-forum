const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL);

const Models = require("../src/models");

Object.values(Models).forEach(model => model.collection.drop().then(console.log));
