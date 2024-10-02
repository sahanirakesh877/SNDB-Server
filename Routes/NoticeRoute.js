const express = require("express");
const router = express.Router();

const noticeController = require("../Controllers/NoticeController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/createnotice")
  .post(
    checkIsUserAuthenticated,
    upload.noticesUpload.single("Noticeimage"),
    noticeController.createNotice
  );

router.route("/getallnotice").get(noticeController.getNotices);
router.route("/getsinglenotice/:id").get(noticeController.getSingleNotice);

router
  .route("/deletenotice/:id")
  .delete(checkIsUserAuthenticated, noticeController.deleteNotice);

router.route("/contact").post(noticeController.contactHandler);

module.exports = router;
