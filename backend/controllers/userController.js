const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Img = require("../models/imgModel");

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

const getUserInfo = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await User.findById(user_id)
      .populate("userBlogs")
      .populate("profilePic");

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Assuming profilePicture is stored as Buffer in MongoDB
    // if (user.profilePic instanceof Buffer) {
    //   user.profilePic = user.profilePic.toString("base64");
    //   console.log(user.profilePic);
    // }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateInfo = async (req, res) => {
  const user_id = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(400).json("No user was found");
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadPic = async (req, res) => {
  const id = req.user._id;
  try {
    const { base64 } = req.body; // Assuming base64 is sent from frontend
    const buffer = Buffer.from(base64, "base64"); // Convert base64 to Buffer

    const newImg = new Img({
      image: buffer,
      uploadedBy: id, // Assigning req.user._id to uploadedBy field
    });

    await newImg.save(); // Save the new image document
    await User.findByIdAndUpdate(req.user._id, { profilePic: newImg._id }); // Update user profilePicture field

    res.send({ status: "ok" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Failed to upload profile picture" });
  }
};

module.exports = {
  getUserInfo,
  updateInfo,
  loginUser,
  signupUser,
  uploadPic,
};
