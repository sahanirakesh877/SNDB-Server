const express = require("express");
const router = express.Router();

const heroController = require("../Controllers/HeroController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/herobanner")
  .post(
    checkIsUserAuthenticated,
    upload.HeroUpload.single("Heroimage"),
    heroController.createHero
  );

router.route("/getallheroimg").get(heroController.getHero);
router
  .route("/deleteheroimg/:id")
  .delete(checkIsUserAuthenticated, heroController.deleteBanner);

module.exports = router;
