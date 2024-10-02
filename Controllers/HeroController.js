const Hero = require("../Models/HeroSchema");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

// Create a new HeroBanner
const createHero = asyncHandler(async (req, res) => {
  try {
    const {title}=req.body;
    console.log(req.file);
    const image = req.file.path;
    const newHero = new Hero({ images: image , title});
    await newHero.save();
    res.status(201).json({
      success: true,
      message: "banner page created",
      newHero
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all HeroBanners
const getHero = asyncHandler(async (req, res) => {
  try {
    const Heros = await Hero.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      Heros,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a HeroBanner
const deleteBanner = asyncHandler(async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ message: "HeroBanner not found" });

    const filepath = hero.images;

    const normalizedPath = path.normalize(filepath);

    if (fs.existsSync(normalizedPath)) {
      fs.unlink(normalizedPath, async (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
          return res
            .status(500)
            .json({ message: "Error deleting file", message: err.message });
        }
        console.log("deleted");
        res.status(200).json({ success: true, message: "HeroBanner deleted" });
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { createHero, getHero, deleteBanner };
