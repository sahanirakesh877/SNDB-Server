const Profile = require("../Models/profileSchema");
const asyncHandler = require("express-async-handler");

// Create a new profile
const createProfile = asyncHandler(async (req, res) => {
  try {
    const { title, position,phone,email } = req.body;
    const image = req.file.path;

    // Validate inputs
    if (!title || !position || !image || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new profile
    const newProfile = new Profile({ title, position, image,phone, email });
    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all profiles
const getAllProfile = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find();
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
const deleteProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ success: true, message: "Profile deleted" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createProfile, getAllProfile, deleteProfile };
