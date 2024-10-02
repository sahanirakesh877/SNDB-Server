const express = require("express");
const contactform = require("../Controllers/NoticeController");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");
const router = express.Router();

router
  .route("/contact")
  .post(checkIsUserAuthenticated, contactform.contactHandler);

module.exports = router;
