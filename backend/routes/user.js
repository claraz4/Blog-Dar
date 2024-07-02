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

//userRoutes.post("/uploadPic", auth, upload, uploadProfilePic);

// POST route to upload an image
userRoutes.post("/uploadPic", uploadPic);

// GET route to retrieve all images
userRoutes.get("/getImage", getImage);

module.exports = userRoutes;
