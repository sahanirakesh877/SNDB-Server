const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const categoryModel = mongoose.model("blogCategory", blogCategorySchema);
module.exports = categoryModel;
