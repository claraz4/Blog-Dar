const express = require("express");

const auth = require("../middleware/requireAuth");

const userRoutes = express.Router();

const multer = require("multer");

const {
  loginUser,
  signupUser,
  uploadProfilePic,
} = require("../controllers/userController");

//Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

// Route for uploading profile picture
userRoutes.post(
  "/users/:userId/upload-picture",
  upload.single("profilePic"),
  uploadProfilePic
);

userRoutes.post("/login", loginUser);

userRoutes.post("/signup", signupUser);

module.exports = userRoutes;
