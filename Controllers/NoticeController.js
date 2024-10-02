const Notice = require("../Models/NoticeSchema");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// Create a new notice
const createNotice = asyncHandler(async (req, res) => {
  try {

    const { title } = req.body;
    const image = req.file.path;
    const newNotice = new Notice({ images: image, title, });
    await newNotice.save();
    res.status(201).json({
      success: true,
      message: "Notice created",
      notice: newNotice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all notices
const getNotices = asyncHandler(async (req, res) => {
  try {
    const notices = await Notice.find().sort({createdAt:-1});
    res.status(200).json({
      success: true,
      notices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all notices
const getSingleNotice = asyncHandler(async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// Delete a notice
const deleteNotice = asyncHandler(async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    const filepath = notice.images;

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
        res.status(200).json({ success: true, message: "Notices  deleted" });
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// contact
const contactHandler = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phone, message } = req.body;
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      message.trim() === ""
    ) {
      return res.json({
        success: false,
        message: "All fields are required.",
      });
    }
    const transporter = nodemailer.createTransport({
      // Specify your email service details (SMTP or other service)
      service: "gmail",
      auth: {
        user: "sahanirakesh877@gmail.com",
        pass: "pnvh gmbs hzrd wdzc",
      },
    });
    // Compose email message
    const smailOptions = {
      to: "sahaniranzeth877@gmail.com",
      subject: "Message from aakshara.com",
      html: `
      <h1>By: </h1><span>${req.body.email}</span>
      <h1>Name: </h1><span>${req.body.name}</span>

      <h1>Phone: </h1><span>${req.body.phone}</span>
      <p>${req.body.message}</p>
    `,
    };

    const rmailOptions = {
      from: "sahanirakesh877@gmail.com",
      to: req.body.email,
      subject: "Thank You for Contacting Us!",
      html: `
      <h1>We’ve Received Your Message </h1>
      <p>Hello ${req.body.name},</p>
      <p>We will get back to you sortly</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
    };

    // Send email
    transporter.sendMail(smailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Email could not be sent to aakshara" });
      }
      console.log("Email sent to aakshara " + info.response);

      transporter.sendMail(rmailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Email could not be sent to client" });
        }
        res.json({
          success: true,
          message: "message sent",
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { createNotice, getNotices, deleteNotice,getSingleNotice, contactHandler };
