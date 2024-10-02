const express = require("express");
const router = express.Router();

const memberController = require("../Controllers/memberController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/createmember")
  .post(
    upload.memberVoucherUpload.fields([
      { name: "image", maxCount: 1 },
      { name: "voucherImage", maxCount: 1 }
    ]),
    memberController.createmember
  );
router.route("/getallmember").get(memberController.getAllMembership);
router
  .route("/deletemember/:id")
  .delete(checkIsUserAuthenticated, memberController.deletemember);

module.exports = router;
