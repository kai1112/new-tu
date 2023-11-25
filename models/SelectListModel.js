const mongoose = require("./dbConnection");

const SelectList = mongoose.Schema(
  {
    name: String,
    property: String,
    options: Array,
  },
  {
    timestamp: true,
  }
);

const selectListModel = mongoose.model("SelectList", SelectList);
module.exports = selectListModel
