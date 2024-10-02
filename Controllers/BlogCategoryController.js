const asyncHandler = require("express-async-handler");
const Category = require("../Models/BlogCategorySchema");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const catagoryFound = await Category.findOne({ title: req.body.title });

    if (catagoryFound) {
      return res.json({
        message: "Catagory Exists",
      });
    }

    const category = new Category({
      title: req.body.title,
    });

    await category.save();
    const categories = await Category.find({});
    res.json({
      success: true,
      message: "Category Added",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  console.log(req.body);
});

// get categories
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json({
      success: true,
      message: "Fetched Categories",
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const {id} = req.params;
  
     await Category.findByIdAndDelete(id);
    const categories = await Category.find({})
    res.json({
      success: true,
      message: "Deleted Category",
      categories,
    });
});

module.exports = { createCategory, getCategories, deleteCategory };
