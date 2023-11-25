const mongoose = require("./dbConnection");

const User = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    isAdmin: { type: Boolean },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", User);
module.exports = UserModel;
