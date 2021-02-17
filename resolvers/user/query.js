const User = require("./model");

module.exports = {
  async users() {
    return await User.find();
  },
  async user(parent, { _id }) {
    return await User.findById(_id);
  },
  async userCount() {
    return await User.countDocuments();
  },
};
