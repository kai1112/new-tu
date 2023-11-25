const mongoose = require("./dbConnection");

const ListTypeProductSchema = mongoose.Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

const listTypeProductModel = mongoose.model(
  "ListTypeproduct",
  ListTypeProductSchema
);
module.exports = listTypeProductModel;
