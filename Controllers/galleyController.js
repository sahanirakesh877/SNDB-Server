const Galleries = require("../Models/GallerySchema");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

// Create a new threeDimage
const createGalleries = asyncHandler(async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
   
    if ( !imagePaths.length) {
      return res.status(400).json({ message: "Title and images are required" });
    }
    const gallery = new Galleries({
   
      images: imagePaths,
    });
    await gallery.save();
    res.status(201).json({
      success: true,
      message: "gallery created",
      gallery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all galleries
const getAllGalleries = asyncHandler(async (req, res) => {
  try {
    const gallery = await Galleries.find();
    res.status(200).json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single galleries
const getSingleGallery = asyncHandler(async (req, res) => {
  try {
    const gallery = await Galleries.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    res.status(200).json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a gallery and its associated files
const deleteGalleries = asyncHandler(async (req, res) => {
  try {
    // Find and delete the gallery by ID
    const gallery = await Galleries.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Delete gallery entry
    await Galleries.findByIdAndDelete(req.params.id);

    // Delete associated files
    gallery.images.forEach((imagePath) => {
      const fullPath = path.join(__dirname, "..", imagePath); // Adjust 'uploads' to your actual folder name
      const normalisedPath = path.normalize(fullPath);
      fs.unlink(normalisedPath, (err) => {
        if (err) {
          return console.error(
            `Failed to delete file ${fullPath}: ${err.message}`
          );
        }
        console.log("deleted file at path ", normalisedPath);
      });
    });

    res
      .status(200)
      .json({ success: true, message: "Gallery deleted and files removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = deleteGalleries;

module.exports = {
  createGalleries,
  getAllGalleries,
  deleteGalleries,
  getSingleGallery,
};
