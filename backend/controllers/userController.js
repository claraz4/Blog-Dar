const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

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

const uploadProfilePic = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId); // Adjust how you fetch user based on your route setup
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Example of updating profile picture
    user.profilePicture.data = fs.readFileSync(
      path.join(__dirname + "/uploads/" + req.file.filename)
    );
    user.profilePicture.contentType = "image/png"; // Adjust content type based on file type

    await user.save();
    res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { loginUser, signupUser, uploadProfilePic };
