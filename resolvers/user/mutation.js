const User = require("./model");

module.exports = {
  async createUser(parent, args, { pubsub }) {
    const user = new User(args);
    await user.save();
    pubsub.publish("CREATED_USER", { createdUser: user });
    pubsub.publish("COUNT_USER", { countUsers: await User.countDocuments() });
    return user;
  },
  async editUser(parent, args) {
    const user = await User.findByIdAndUpdate(args._id, args);
    return user;
  },
  async deleteUser(parent, { _id }) {
    const user = await User.findByIdAndDelete(_id);
    pubsub.publish("COUNT_USER", { countUsers: await User.countDocuments() });
    return user;
  },
};
