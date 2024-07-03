const express = require("express");

const auth = require("../middleware/requireAuth");

const userRoutes = express.Router();

const img = require("../models/imgModel");

const {
  getUserInfo,
  updateInfo,
  loginUser,
  signupUser,
  uploadPic,
  getImage,
  //uploadProfilePic,
  //upload,
} = require("../controllers/userController");

userRoutes.get("/info", auth, getUserInfo);

userRoutes.patch("/updateInfo", auth, updateInfo);

userRoutes.post("/login", loginUser);

userRoutes.post("/signup", signupUser);

userRoutes.post("/uploadPic", upload, uploadProfilePic);
// userRoutes.post("/uploadPic", auth, upload, uploadProfilePic);

module.exports = userRoutes;
