const selectListModel = require("../models/SelectListModel");

module.exports.selectList = async (req, res) => {
  try {
    let selectList = await selectListModel
      .find()
      .select("_id + name + property + options");
    return res.json({ status: 200, data: selectList });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.detail = async (req, res) => {
  try {
    let selectList = await selectListModel
      .findOne({ _id: req.params.id })
      .select("_id + name + property + options");
    return res.json({ status: 200, data: selectList });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.create = async (req, res) => {
  try {
    let selectList = await selectListModel.findOne({ name: req.body.name });
    if (selectList)
      return res.json({ status: 404, message: "name is already" });
    let select = await selectListModel.create({
      name: req.body.name,
      property: req.body.property,
      options: req.body.options,
    });
    return res.json({ status: 200, data: select });
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

module.exports.update = async (req, res) => {
  try {
    let data = await selectListModel.findOne({ _id: req.params.id });
    if (!data)
      return res.status({ status: 404, message: "select list not found" });
    if (req.body.name) data.name = req.body.name;
    if (req.body.property) data.property = req.body.property;
    if (req.body.options) data.options = req.body.options;
    await selectListModel.updateOne({ _id: data._id }, data);
    let newData = await selectListModel.findOne({ _id: data._id });
    return res.json({ status: 200, data: newData });
  } catch (err) {
    res.json(err);
  }
};

module.exports.delete = async (req, res) => {
  try {
    let data = await selectListModel.findOne({ _id: req.params.id });
    if (!data)
      return res.status({ status: 404, message: "select list not found" });
    await selectListModel.deleteOne({ _id: data._id });
    return res.json({ status: 200, message: "delete success" });
  } catch (err) {
    res.json(err);
  }
};
