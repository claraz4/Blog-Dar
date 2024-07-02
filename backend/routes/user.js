const express = require("express");

const auth = require("../middleware/requireAuth");

const userRoutes = express.Router();

const {
  getUserInfo,
  loginUser,
  signupUser,
  uploadProfilePic,
  upload,
} = require("../controllers/userController");

userRoutes.get("/info", auth, getUserInfo);

userRoutes.post("/login", loginUser);

userRoutes.post("/signup", signupUser);

userRoutes.post("/uploadPic", auth, upload, uploadProfilePic);

module.exports = userRoutes;
