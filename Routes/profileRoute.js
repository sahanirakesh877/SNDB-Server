const express = require("express");
const router = express.Router();

const introController = require("../Controllers/profileController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/createprofile")
  .post(
    checkIsUserAuthenticated,
    upload.ProfileUpload.single("profileimage"),
    introController.createProfile
  );
router.route("/getallprofile").get(introController.getAllProfile);
router
  .route("/deleteprofile/:id")
  .delete(checkIsUserAuthenticated, introController.deleteProfile);

module.exports = router;
