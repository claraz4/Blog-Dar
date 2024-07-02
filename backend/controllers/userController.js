const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const multer = require("multer");

const img = require("../models/imgModel");

//const upload = multer({});

// const uploadProfilePic = async (req, res) => {
//   const user_id = req.user._id;

//   try {
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!req.file || !req.file.buffer) {
//       return res
//         .status(400)
//         .json({ error: "No file uploaded or file data missing" });
//     }

//     const newImage = new Img({
//       data: req.file.buffer, // Store file data as Buffer
//       contentType: req.file.mimetype, // MIME type of the file
//       uploadedby: user_id,
//     });

//     await newImage.save();

//     user.profilePic = newImage._id;

//     // Save the updated user document
//     await user.save();

//     // Respond with success message
//     res.status(200).json({ message: "Profile picture uploaded successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// POST /uploadPic - Upload a single image
const uploadPic = (req, res) => {
  upload.single("profilePic")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload failed", error: err });
    }
    img
      .create({ image: req.file.filename })
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(500).json({ message: "Error saving image", error: err })
      );
  });
};

// GET /getImage - Retrieve all images
const getImage = (req, res) => {
  img
    .find()
    .then((images) => res.json(images))
    .catch((err) =>
      res.status(500).json({ message: "Error retrieving images", error: err })
    );
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
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInfo = async (req, res) => {
  const user_id = req.user._id;

  try {
    const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      res.status(400).json("No user was found");
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserInfo,
  updateInfo,
  loginUser,
  signupUser,
  uploadPic,
  getImage,
  //uploadProfilePic,
  //upload: upload.single("profilePic"),
};
