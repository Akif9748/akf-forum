const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL, () => console.log("Database is connected"));

const Models = require("../models");

Object.values(Models).forEach(model => model.deleteMany({}).then(console.log));
