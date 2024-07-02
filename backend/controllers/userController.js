const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const multer = require("multer");

const Img = require("../models/imgModel");

const upload = multer({});

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const user = await User.signup(email, password, first_name, last_name);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const uploadProfilePic = async (req, res) => {
  const user_id = req.user._id; // Assuming you have authentication middleware setting req.user

  try {
    // Find the user by ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if req.file exists and the path is correct
    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ error: "No file uploaded or file data missing" });
    }

    // Create a new Image document in MongoDB
    const newImage = new Img({
      data: req.file.buffer, // Store file data as Buffer
      contentType: req.file.mimetype, // MIME type of the file
      uploadedby: user_id,
    });

    // Save the new Image document
    await newImage.save();

    // Update user's profilePic field with the new Image document's ID
    user.profilePic = newImage._id;

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserInfo = async (req, res) => {};

module.exports = {
  getUserInfo,
  loginUser,
  signupUser,
  uploadProfilePic,
  upload: upload.single("profilePic"),
};
