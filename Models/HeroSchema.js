const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    images: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const noticeModel = mongoose.model("Hero", HeroSchema);
module.exports = noticeModel;
