const express = require("express");
const router = express.Router();

const galleriesController = require("../Controllers/galleyController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/creategallery")
  .post(
    checkIsUserAuthenticated,
    upload.galleriesUpload.array("galleries", 10),
    galleriesController.createGalleries
  );
router.route("/getallgallery").get(galleriesController.getAllGalleries);
router.route("/getallgallery/:id").get(galleriesController.getSingleGallery);
router
  .route("/deletegallery/:id")
  .delete(checkIsUserAuthenticated, galleriesController.deleteGalleries);

module.exports = router;
