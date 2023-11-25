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

module.exports.pagination = async (req, res) => {
  try {
    let listProduct = await productModel.find();
    let total = listProduct.length / 20;
    let pagination = await productModel
      .find()
      .skip(20 * (req.params.page - 1))
      .limit(20);
    return res.json({
      status: 200,
      data: { products: pagination, current: req.params.page, pages: total },
    });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.search = async (req, res) => {
  try {
    let product = await productModel.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    if (product) {
      res.json({ status: 200, data: product });
    }
    res.json({ status: 404, message: "Product not found" });
  } catch (e) {
    res.json(e);
  }
};

module.exports.create = async (req, res) => {
  try {
    let findProduct = await productModel.findOne({ name: req.body.name });
    if (findProduct)
      return res.json({ status: 404, message: "name is already" });
    let product = await productModel.create({
      name: req.body.name,
      price: req.body.price,
      salePrice: req.body.salePrice,
      amount: req.body.amount,
      type: req.body.type,
      image: "/" + req.files["image"][0].path,
      rating: req.body.rating,
    });
    return res.json({ status: 200, data: product });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.update = async (req, res) => {
  try {
    let findProduct = await productModel.findOne({ _id: req.body._id });
    console.log(findProduct);
    if (!findProduct)
      return res.json({ status: 404, message: "can not find product" });
    if (req.body.name) findProduct.name = req.body.name;
    if (req.body.price) findProduct.price = req.body.price;
    if (req.body.salePrice) findProduct.salePrice = req.body.salePrice;
    if (req.body.amount) findProduct.amount = req.body.amount;
    if (req.body.image) findProduct.image = "/" + req.files["image"][0].path;
    if (req.body.rating) findProduct.rating = req.body.rating;
    await productModel.updateOne(
      { _id: req.body._id },
      {
        name: findProduct.name,
        price: findProduct.price,
        salePrice: findProduct.salePrice,
        amount: findProduct.amount,
        type: findProduct.type,
        image: findProduct.image,
        rating: findProduct.rating,
      }
    );
    let product = await productModel.findOne({ _id: req.body._id });
    return res.json({ status: 200, data: product });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.blog = async (req, res) => {
  try {
    let findProduct = await productModel.findOne({ _id: req.params.id });
    if (!findProduct)
      return res.json({ status: 404, message: "can not find product" });
    if (!req.body.blog)
      return res.json({ status: 404, message: "blog not found" });
    await productModel.updateOne(
      { _id: req.params.id },
      {
        blog: req.body.blog,
      }
    );
    let product = await productModel.findOne({ _id: req.params.id });
    return res.json({ status: 200, data: product });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.comment = async (req, res) => {
  try {
    let findProduct = await productModel.findOne({ _id: req.params.id });
    if (!findProduct)
      return res.json({ status: 404, message: "can not find product" });
    let comment = { replies: [] };
    if (req.body.isAdmin) comment.isAdmin = req.body.isAdmin;
    if (req.body.content) comment.content = req.body.content;
    if (req.body.nameUser) comment.nameUser = req.body.nameUser;
    findProduct.comments.push(comment);
    await productModel.updateOne({ _id: req.params.id }, findProduct);
    let product = await productModel.findOne({ _id: req.params.id });
    return res.json({ status: 200, data: product });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.findProductByIdComment = async (req, res) => {
  try {
    let findProduct = await productModel.findOne({ _id: req.params.id });
    if (!findProduct)
      return res.json({ status: 404, message: "can not find product" });
    let rep = {
      idComment: req.body.idComment,
    };
    if (req.body.isAdmin) rep.isAdmin = req.body.isAdmin;
    if (req.body.content) rep.content = req.body.content;
    if (req.body.nameUser) rep.nameUser = req.body.nameUser;
    console.log(findProduct.comments.length);
    for (let j = 0; j < findProduct.comments.length; j++) {
      console.log(findProduct.comments[j]._id == req.body.idComment);
      if (findProduct.comments[j]._id == req.body.idComment) {
        findProduct.comments[j].replies =
          findProduct.comments[j].replies.push(rep);
        console.log(findProduct.comments[j]);
        await productModel.updateOne({ _id: req.params.id }, findProduct);
        let product = await productModel.findOne({ _id: req.params.id });
        return res.json({ status: 200, data: product });
      }
    }
    return res.json({
      status: 404,
      message: "can not find comment in product",
    });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.delete = async (req, res) => {
  try {
    let data = await productModel.findOne({ _id: req.params.id });
    if (!data)
      return res.status({ status: 404, message: "select list not found" });
    await productModel.deleteOne({ _id: data._id });
    return res.json({ status: 200, message: "delete success" });
  } catch (err) {
    res.json(err);
  }
};
