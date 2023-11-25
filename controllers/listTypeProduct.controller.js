const Product = require("../models/ListTypeProductModel");

module.exports.typeProduct = async (req, res) => {
  try {
    let product = await Product.find().select("_id + name + img");
    return res.json({ status: 200, data: product });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.create = async (req, res) => {
  try {
    let img = [];
    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        img.push("/" + req.files[i].path);
      }
    } else {
      img = null;
    }
    let product = await Product.create({
      name: req.body.name,
      img: JSON.stringify(img),
    });
    return res.json({ status: 200, data: product });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};
