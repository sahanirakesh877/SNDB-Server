const express = require("express");
const router = express.Router();
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

const categoryController = require("../Controllers/BlogCategoryController");

router
  .route("/")
  .post(checkIsUserAuthenticated, categoryController.createCategory);

router.route("/").get(categoryController.getCategories);
router.route("/:id").delete(checkIsUserAuthenticated, categoryController.deleteCategory)

module.exports = router;
