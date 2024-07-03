const express = require("express");

const auth = require("../middleware/requireAuth");

const userRoutes = express.Router();

const Img = require("../models/imgModel");

const User = require("../models/userModel");

const {
  getUserInfo,
  updateInfo,
  loginUser,
  signupUser,
  uploadPic,
} = require("../controllers/userController");

userRoutes.get("/info", auth, getUserInfo);

userRoutes.patch("/updateInfo", auth, updateInfo);

userRoutes.post("/login", loginUser);

userRoutes.post("/signup", signupUser);

userRoutes.post("/uploadPic", auth, uploadPic);

module.exports = userRoutes;
