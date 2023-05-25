const UserModel = require("./User");
const UserCache = [];

module.exports.getAuthor = async function () {
    const id = this.authorID || this.author?.id;
    let user = UserCache.find(user => user?.id == id)
    if (!user)
        UserCache.push(user = await UserModel.findOne({ id }))

    if (!this.get('authorID', null, { getters: false })) {
        this.authorID = user.id;
        await this.save();
    }

    this.author = user;

    return this;
}