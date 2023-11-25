const mongoose = require("./dbConnection");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    star: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", Product);

module.exports = ProductModel;