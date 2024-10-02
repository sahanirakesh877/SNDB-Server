const express = require("express");
const router = express.Router();

const pdfController = require("../Controllers/pdfController");
const upload = require("../multerconfig/Storageconfig");
const { checkIsUserAuthenticated } = require("../middleware/AuthMiddleware");

router
  .route("/uploadpdf")
  .post(
    checkIsUserAuthenticated,
    upload.pdfUpload.single("pdfFile"),
    pdfController.createPDF
  );

router.route("/getallpdf").get(pdfController.getAllPDF);
router
  .route("/deletepdf/:id")
  .delete(checkIsUserAuthenticated, pdfController.deletePDF);

module.exports = router;
