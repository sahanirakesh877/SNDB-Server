const mongoose = require("mongoose");

const gallery = new mongoose.Schema(
  {

    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const galleryModel = mongoose.model("galleries", gallery);
module.exports = galleryModel;
