const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "enter title"],
    },
    description: {
      type: String,
      required: [true, "enter description"],
    },
    image: {
      type: String,
      required: true,
    },
    category: { type: mongoose.Types.ObjectId, ref: "blogCategory" },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
