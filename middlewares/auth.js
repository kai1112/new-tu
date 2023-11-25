const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
module.exports.checkRoleAdmin = async (req, res, next) => {
  try {
    console.log(req.user.isAdmin);
    if (req.user.isAdmin == true) {
      next();
    } else {
      res.json({ status: 404, message: "Role not allowed!!!" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.checkRoleUser = async (req, res, next) => {
  try {
    if (req.user.role.name === "user") {
      next();
    } else {
      res.json({ status: 404, message: "Role not allowed!!!" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.checkToken = async (req, res, next) => {
  try {
    let token = req.headers.access_token;
    let searchTokenUser = await UserModel.findOne({ token: token });
    if (searchTokenUser) {
      req.user = searchTokenUser;
      next();
    } else {
      return res.json({ status: 404, message: "Token is not available!!!" });
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      res.json({ status: 404, message: "JWT expired!!!!" });
    } else {
      res.json(error);
    }
  }
};
