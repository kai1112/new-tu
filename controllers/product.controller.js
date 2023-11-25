const productModel = require("../models/ProductModel");

module.exports.listProduct = async (req, res) => {
  try {
    let listProduct = await productModel
      .find()
      .select("_id + name + image + salePrice + price");
    return res.json({ status: 200, data: listProduct });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.findBytype = async (req, res) => {
  try {
    let detailProducts = await productModel
      .find({
        type: req.params.type,
      })
      .select(
        "_id + name + image + salePrice + price + rating + amount + type + blog"
      )
      .populate("reviews")
      .populate("comments");
    return res.json({ status: 200, data: detailProducts });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.findById = async (req, res) => {
  try {
    let detailProducts = await productModel
      .findOne({
        _id: req.params.id,
      })
      .select(
        "_id + name + image + salePrice + price + rating + amount + type + blog"
      )
      .populate("reviews")
      .populate("comments");
    return res.json({ status: 200, data: detailProducts });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};
