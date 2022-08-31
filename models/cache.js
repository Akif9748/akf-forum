const UserModel = require("./User");
const UserCache = [];

module.exports.getAuthor = async function () {
    console.log("User Cache Length:", UserCache.length);
    const id = this.authorID || this.author?.id;
    let user = UserCache.find(user => user?.id == id)
    if (!user) {
        user = await UserModel.findOne({ id })
        UserCache.push(user)
    }
    this.author = user;
    return this;
}