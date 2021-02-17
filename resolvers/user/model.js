const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: String,
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator);

module.exports = mongoose.model("user", schema);
