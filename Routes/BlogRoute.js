const express = require("express");
const router = express.Router();

const blogcontroller = require("../Controllers/BlogController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/createblog")
  .post(
    checkIsUserAuthenticated,
    upload.blogUpload.single("Blogimage"),
    blogcontroller.createBlog
  );



router.route("/").get(blogcontroller.getAllBlogs);
router.route("/:id").get(blogcontroller.getBlogById);
router
  .route("/:id")
  .put(checkIsUserAuthenticated, blogcontroller.updateBlogById);
router
  .route("/:id")
  .delete(checkIsUserAuthenticated, blogcontroller.deleteBlogById);
router
  .route("/deleteallblogs")
  .delete(checkIsUserAuthenticated, blogcontroller.deleteAllBlogs);

module.exports = router;
