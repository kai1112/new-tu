const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://MrTu:Anhtu2817@cluster0.jeyxu75.mongodb.net/final_project_tu?retryWrites=true&w=majority"
);

module.exports = mongoose;
