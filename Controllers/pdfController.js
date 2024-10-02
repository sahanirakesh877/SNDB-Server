const PDF = require("../Models/PdfSchema");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

// Create a new PDF
const createPDF = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;
    const filePath = req.file.path;

    if (!title || !filePath) {
      return res
        .status(400)
        .json({ message: "Title and PDF file are required" });
    }

    const newPDF = new PDF({
      title: title,
      filePath: filePath,
    });

    await newPDF.save();

    res.status(201).json({
      success: true,
      message: "PDF created successfully",
      pdf: newPDF,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all threeDimage
const getAllPDF = asyncHandler(async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.status(200).json({ success: true, pdfs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a deleteThreeD
const deletePDF = asyncHandler(async (req, res) => {
  try {
    const pdfs = await PDF.findByIdAndDelete(req.params.id);
    if (!pdfs) return res.status(404).json({ message: "pdf  not found" });

    const filepath = pdfs.filePath;
    const normalizedPath = path.normalize(filepath);

    if (fs.existsSync(normalizedPath)) {
      fs.unlink(normalizedPath, async (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
          return res
            .status(500)
            .json({ message: "Error deleting file", error: err.message });
        }
        console.log("deleted")
        res.status(200).json({ success: true, message: "pdf  deleted" });
      });
     }
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createPDF, getAllPDF, deletePDF };
