const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL);

const { UserModel } = require("../src/models");
(async () => {

  const member = await UserModel.get("0");
  member.admin = true;
  console.log(await member.save());
})();