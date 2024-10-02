const multer = require("multer");

// Set up Multer storage options for Blog images
const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blog");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer storage options for notice images
const noticeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/notices");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer storage options for Heroimages
const heroStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/hero");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const memberStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/membership");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const voucherStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/voucher");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const galleriesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/galleries");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/pdf");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `pdf-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
// Define file filter function to allow only PDF files
const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    // Accept file
    cb(null, true);
  } else {
    // Reject file with specific error
    cb(new Error("Only PDF files are allowed"));
  }
};

// Define file filter function to allow only specific image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    // Accept file
    cb(null, true);
  } else {
    // Reject file with specific error
    cb(new Error("Only jpeg, png, jpg images are allowed"));
  }
};

// Initialize Multer with configured options
const blogUpload = multer({
  storage: blogStorage,
  fileFilter: fileFilter,
});

const noticesUpload = multer({
  storage: noticeStorage,
  fileFilter: fileFilter,
});

const HeroUpload = multer({
  storage: heroStorage,
  fileFilter: fileFilter,
});

const ProfileUpload = multer({
  storage: profileStorage,
  fileFilter: fileFilter,
});

const MemberUpload = multer({
  storage: memberStorage,
  fileFilter: fileFilter,
});

const voucherUpload = multer({
  storage: voucherStorage,
  fileFilter: fileFilter,
});

const galleriesUpload = multer({
  storage: galleriesStorage,
  fileFilter: fileFilter,
});

const pdfUpload = multer({
  storage: pdfStorage,
  pdfFileFilter: pdfFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});



const memberVoucherUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "image") {
        cb(null, "./uploads/membership");
      } else if (file.fieldname === "voucherImage") {
        cb(null, "./uploads/voucher");
      }
    },
    filename: function (req, file, cb) {
      const filename = `image-${Date.now()}.${file.originalname}`;
      cb(null, filename);
    },
  }),
  fileFilter: fileFilter, // Make sure fileFilter allows only images.
});

module.exports = {
  blogUpload,
  noticesUpload,
  HeroUpload,
  galleriesUpload,
  pdfUpload,
  ProfileUpload,
  MemberUpload,
  voucherUpload,
  memberVoucherUpload
};
