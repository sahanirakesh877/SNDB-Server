const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;

// databases connections
const ConnectDB = require("./DataBase/ConnectDb");
ConnectDB();
// middleware
app.use(morgan("dev"));
app.use(errorHandler);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads/"));

// user routes defined
const userrouter = require("./Routes/UserRoutes");
app.use("/api/v1", userrouter);

// blogs  routes defined
const blogrouter = require("./Routes/BlogRoute");
app.use("/api/v1/blog", blogrouter);
// blog category route defined
const blogCategoryRoute = require("./Routes/blogCategoryRoute");
app.use("/api/v1/category", blogCategoryRoute);

// notice  routes defined
const noticerouter = require("./Routes/NoticeRoute");
app.use("/api/v1/notice", noticerouter);

// HeroPhotos  routes defined
const herorouter = require("./Routes/heroRoute");
app.use("/api/v1/hero", herorouter);

// contact route defined
const ContactRoute = require("./Routes/ContactRoute");
app.use("/api/v1/", ContactRoute);

// Galleries route defined
const GalleryRoute = require("./Routes/galleriesRoute");
app.use("/api/v1", GalleryRoute);

// pdf route defined
const pdfRoute = require("./Routes/pdfRoute");
app.use("/api/v1", pdfRoute);

// profile route defined
const profileRoute = require("./Routes/profileRoute");
app.use("/api/v1", profileRoute);

// member route defined
const memberRoute = require("./Routes/memberRoute");
app.use("/api/v1", memberRoute);

app.listen(PORT, () => {
  console.log(` Server listening on ${PORT}`);
});
