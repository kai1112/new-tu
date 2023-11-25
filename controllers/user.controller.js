const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login
module.exports.login = async (req, res) => {
  try {
    const data = await User.findOne({
      email: req.body.email,
    });
    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        let user = await User.findOne({ email: req.body.email });
        res.json({ status: 200, data: user });
      } else {
        res.json({ status: 404, message: " incorrect password" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};
// register
module.exports.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({
        status: 400,
        message: "Email already exists",
      });
    } else {
      // mã hoá password
      const password = await bcrypt.hash(req.body.password, 10);
      // create user
      let user = await User.create({
        password: password,
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
      });
      const token = jwt.sign(`${user}`, "kai");
      await User.updateOne({ _id: user._id }, { token: token });
      user.token = token;
      res.json({
        message: "login success",
        status: 200,
        data: user,
      });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    let data = bcrypt.compareSync(req.body.oldPassword, req.user.password);
    if (!data)
      return res.json({ status: 404, message: "old password incorrect" });
    const passwordNew = await bcrypt.hash(req.body.newPassword, 10);
    let user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { password: passwordNew }
    );
    if (!user) return res.json({ status: 404, message: "update user failed" });
    return res.json({ status: 200, message: "update password success" });
  } catch (err) {
    res.json(err);
  }
};

module.exports.listUser = async (req, res) => {
  try {
    let users = await User.find().select(
      "name + address + email + phone + token + isAdmin"
    );
    if (users.length == 0)
      return res.json({ status: 404, message: "can't find user" });
    return res.json({ status: 200, data: users });
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    if (req.body.name) req.user.name = req.body.name;
    if (req.body.email) req.user.email = req.body.email;
    if (req.body.password) {
      let data = bcrypt.hash(req.body.password, 10);
      req.user.password = data;
    }
    if (req.body.phone) req.user.phone = req.body.phone;
    if (req.body.address) req.user.address = req.body.address;
    await User.updateOne({ _id: req.user._id }, req.user);
    let newData = await User.findOne({ _id: req.user._id });
    return res.json({ status: 200, data: newData });
  } catch (err) {
    res.json(err);
  }
};


module.exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });
    return res.json({ status: 200, message: 'delete success' });
  } catch (err) {
    res.json(err);
  }
};