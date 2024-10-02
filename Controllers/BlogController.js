const asyncHandler = require("express-async-handler");
const Blog = require("../Models/BlogSchema");
const path = require("path");
const fs = require("fs");

// create Blogs
const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (req.file) {
      if (
        title?.trim() === "" ||
        description?.trim() === "" ||
        category?.trim() === ""
      ) {
        return res.status(400).json({
          message:
            "All fields (title, description, image, category) are required",
        });
      }
      const image = req.file.path;
      const newBlog = new Blog({
        title,
        description,
        image,
        category,
      });
      const savedBlog = await newBlog.save();
      res.status(201).json({
        success: true,
        message: "Blog Created successfully",
        savedBlog,
      });
    } else {
      return res.status(400).json({ message: "Image is required" });
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: error.message });
  }
});

// get all  Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  console.log("getting blogs");
  try {
    const { categoryId } = req.query;
    console.log("categoryId: ", categoryId);
    const blogs = await Blog.find(
      categoryId ? { category: categoryId } : {}
    ).sort({ createdAt: -1 });
    // Count the total number of blogs
    const TotalblogsLength = await Blog.countDocuments();
    if (!blogs) {
      return res.status(404).json({ message: "Blogs not found" });
    }

    await Promise.all(blogs.map((blog) => blog.populate("category")));

    res.status(200).json({
      success: true,
      message: "All blogs retrieved successfully",
      TotalblogsLength,
      blogs,
    });
  } catch (error) {
    console.error("Error getting all  blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get single  Blog
const getBlogById = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ message: "Blog id not found" });
    }
    const blog = await Blog.findById(blogId).populate("category");
    if (!blog) {
      res.status(404).json({ message: "Single Blog not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "fetched blog",
        blog,
      });
    }
  } catch (error) {
    console.error("Error in getting single blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// edit Blogs by id
const updateBlogById = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ message: "Blog id not found" });
    }

    const { title, description, selectedCategory } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description, category: selectedCategory },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "blog updated successfully",
        updatedBlog,
      });
    }
  } catch (error) {
    console.error("Error in update blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete single Blogs
const deleteBlogById = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(404).json({ message: "Blog id not found" });
    }

    const deleteBlog = await Blog.findByIdAndDelete(blogId);

    const blogs = await Blog.find({});
    // Count the total number of blogs
    const TotalblogsLength = await Blog.countDocuments();

    await Promise.all(blogs.map((blog) => blog.populate("category")));

    if (deleteBlog) {
      const fileUrl = deleteBlog.image;
      const filePath = path.join(__dirname, "..", fileUrl);
      const normalizedPath = path.normalize(filePath);

      console.log(`Deleting file at path: ${normalizedPath}`);

      if (fs.existsSync(normalizedPath)) {
        fs.unlink(normalizedPath, async (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res
              .status(500)
              .json({ message: "Error deleting file", message: err.message });
          }
          res.json({
            success: true,
            message: "Blog Deleted",
            TotalblogsLength,
            blogs,
          });
        });
      } else {
        res.json({
          status: true,
          message: "blog deleted without image.",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "blog not found",
      });
    }
  } catch (error) {
    console.error("Error in delete single blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete all  Blogs
const deleteAllBlogs = asyncHandler(async (req, res) => {
  try {
    const deleteBlogs = await Blog.deleteMany();
    return res.status(200).json({
      message: "All Blogs deleted successfully",
      TotalRemainingBlogscount: deleteBlogs.deletedCount,
    });
  } catch (error) {
    console.error("Error in delete blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const reuploadImage = asyncHandler(async (req, res) => {
  try {
    const blogId = req.params.id;

    const blogFound = await Blog.findById(blogId);

    if (!blogFound) {
      return res.status(404).json({ message: "blog not found" });
    }
    if (req.file) {
      const filePath = path.join(__dirname, "..", blogFound.image);
      const normalizedPath = path.normalize(filePath);

      console.log(`Deleting file at path: ${normalizedPath}`);

      if (fs.existsSync(normalizedPath)) {
        fs.unlink(normalizedPath, async (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return res
              .status(500)
              .json({ message: "Error deleting file", message: err.message });
          }
          console.log(req.file.path);
          blogFound.image = req.file.path;
          await blogFound.save();
          console.log("updated");

          res.json({
            success: true,
            message: "blog image updated",
          });
        });
      } else {
        console.log(req.file.path);
        blogFound.image = req.file.path;
        await blogFound.save();
        res.json({
          success: true,
          message: "blog deleted without image.",
        });
      }

      blogFound.image = req.file.path;
    } else {
      res.json({
        message: "file not uploaded",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteAllBlogs,
  deleteBlogById,
  reuploadImage,
};
