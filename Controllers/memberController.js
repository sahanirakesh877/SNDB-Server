const membership = require("../Models/MemberSchema");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

// Create a new profile
const createmember = asyncHandler(async (req, res) => {
  try {
    const { name, position, phone, email } = req.body;

    console.log(req.body);

    const imagePath = req.files.image[0].path;
    const voucherPath = req.files.voucherImage[0].path;

    console.log({ imagePath, voucherPath });
    // Validate inputs
    if (!name || !position || !imagePath || !voucherPath || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new profile
    const newProfile = new membership({
      title: name,
      position,
      image: imagePath,
      phone,
      email,
      voucherImage: voucherPath,
    });
    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Membership created successfully",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all profiles
const getAllMembership = asyncHandler(async (req, res) => {
  try {
    const profiles = await membership.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a profile
const deletemember = asyncHandler(async (req, res) => {
  try {
    const profile = await membership.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Member not found" });
    }

    // File paths for both image and voucherImage
    const imageFilepath = profile.image;
    const voucherImageFilepath = profile.voucherImage;

    const normalizedImagePath = path.normalize(imageFilepath);
    const normalizedVoucherImagePath = path.normalize(voucherImageFilepath);

    // Function to delete files
    const deleteFile = (filePath) => {
      return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              return reject(`Error deleting file: ${err.message}`);
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
    };

    try {
      await deleteFile(normalizedImagePath);
      await deleteFile(normalizedVoucherImagePath);
      console.log("Both files deleted successfully");

      res.status(200).json({ success: true, message: "Member deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting files", error: err });
    }
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createmember, getAllMembership, deletemember };
