const UserModel = require("./User");
const UserCache = new Map();
module.exports.getAuthor = async function () {
    const id = this.authorID || this.author?.id;
    let user = UserCache.get(id);
    if (!user)
        UserCache.set(id, user = await UserModel.findOne({ id }));

    if (!this.get('authorID', null, { getters: false })) {
        this.authorID = user.id;
        await this.save();
    }

    this.author = user;

    return this;
}