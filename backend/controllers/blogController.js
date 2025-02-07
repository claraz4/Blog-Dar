const mongoose = require("mongoose");

const blog = require("../models/blogModel");

const User = require("../models/userModel");

const Img = require("../models/imgModel");

const additionalFields = {
  $addFields: {
    likedByCount: { $size: { $ifNull: ["$likedby", []] } },
    dislikedByCount: { $size: { $ifNull: ["$dislikedby", []] } },
  },
};

const filterByPopularity = [
  additionalFields,
  {
    $project: {
      title: 1, // Field for direct display
      author: 1,
      category: 1,
      content: 1,
      likedby: 1,
      dislikedby: 1,
      likedByCount: 1, // Computed field
      dislikedByCount: 1, // Computed field
      image: 1,
      datePublished: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  },
  {
    $sort: { likedByCount: -1 }, // Sort by likedByCount in descending order
  },
  {
    $limit: 10, // Limit to 10 documents
  },
  {
    $lookup: {
      from: "imgs",
      localField: "image",
      foreignField: "_id",
      as: "image",
    },
  },
  {
    $unwind: "$image",
  },
];

const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find().sort({ createdAt: -1 }).populate("image"); // Sort newest to oldest
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getUserBlogs = async (req, res) => {
//   const user_id = req.user._id;
//   const blogs = await blog.find({ user_id }).sort({ createdAt: -1 });
//   res.status(200).json(blogs);
// };

const getUserBlogs = async (req, res) => {
  const user_id = req.user._id;

  try {
    const user = await User.findById(user_id).populate({
      path: "userBlogs",
      populate: {
        path: "image",
        model: "Img",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ userBlogs: user.userBlogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPopularBlogs = async (req, res) => {
  try {
    const blogs = await blog.aggregate(filterByPopularity);

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getBlogByCategory = async (req, res) => {
//   const { category } = req.params;

//   const Blog = await blog.find({ category: category });
//   if (!Blog) {
//     return res.status(404).json({ error: "No such blog" });
//   }
//   return res.status(200).json(Blog);
// };

// const getBlogByTitle = async (req, res) => {
//   const { title } = req.params;

//   try {
//     const blogs = await blog.find({ title: { $regex: title, $options: "i" } });

//     if (blogs.length === 0) {
//       return res.status(404).json({ error: "No such blog" });
//     }

//     return res.status(200).json(blogs);
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

const getBlogsByFilter = async (req, res) => {
  const { category, title } = req.query;

  let searchCriteria = {};

  if (category) {
    searchCriteria.category = category;
  }

  if (title) {
    searchCriteria.title = { $regex: title, $options: "i" };
  }

  try {
    const blogs = await blog.find(searchCriteria).populate("image");

    // if (blogs.length === 0) {
    //   return res.status(404).json({ error: "No such blog" });
    // }

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createBlog = async (req, res) => {
  const { title, category, content, image } = req.body;
  const user_id = req.user._id;

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const author = user.first_name.concat(" ", user.last_name);

  let newImg = new Img({
    image,
    uploadedBy: user_id,
  });

  newImg = await newImg.save();

  try {
    //Create the blog and add it to the blogs
    const Blog = await blog.create({
      title,
      author,
      category,
      content,
      image: newImg._id,
      user_id,
    });

    // Add the blog to the user's postedBlogs array

    user.userBlogs.push(Blog._id);
    await user.save();

    res.status(200).json(Blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such blog to delete" });
  }
  const Blog = await blog.findOneAndDelete({ _id: id });

  if (!Blog) {
    return res.status(404).json({ error: "No such blog" });
  } else {
    return res.status(200).json("Deleted Blog: " + Blog);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("No such blog to update");
  }
  const Blog = await blog.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  }); // the 'new' is to update the Blog directly when returning it instead of refreshing to get it updated

  if (!Blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  return res.status(200).json(Blog);
};

const likedBlog = async (req, res) => {
  try {
    const user_id = req.user._id;
    const blog_id = req.body._id;

    // Find the blog by its ID
    const Blog = await blog.findById(blog_id);

    if (!Blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user has already liked the blog
    const liked = Blog.likedby.includes(user_id); // return true or false

    if (liked) {
      // User has already liked the blog
      Blog.likedby.pull(user_id);
      await Blog.save();
      return res.status(200).json({ message: "Blog already liked", Blog });
    }

    // Check if the user has disliked the blog
    const disliked = Blog.dislikedby.includes(user_id);

    if (disliked) {
      // Remove user from dislikedby array
      Blog.dislikedby.pull(user_id);
    }

    // Add user to likedby array
    Blog.likedby.push(user_id);

    // Save the updated blog
    await Blog.save();

    return res.status(200).json({ message: "Blog liked successfully", Blog });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

const dislikedBlog = async (req, res) => {
  try {
    const user_id = req.user._id;
    const blog_id = req.body._id;

    // Find the blog by its ID
    const Blog = await blog.findById(blog_id);

    if (!Blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user has already disliked the blog
    const disliked = Blog.dislikedby.includes(user_id);

    if (disliked) {
      // User already disliked the blog
      Blog.dislikedby.pull(user_id);
      await Blog.save();
      return res.status(200).json({ message: "Blog already disliked", Blog });
    }

    // Check if the user has liked the blog
    const liked = Blog.likedby.includes(user_id);

    if (liked) {
      // Remove user from likedby array
      Blog.likedby.pull(user_id);
    }

    // Add user to dislikedby array
    Blog.dislikedby.push(user_id);

    // Save the updated blog
    await Blog.save();

    return res
      .status(200)
      .json({ message: "Blog disliked successfully", Blog });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};

module.exports = {
  getBlogs,
  getUserBlogs,
  getBlogsByFilter,
  getPopularBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  likedBlog,
  dislikedBlog,
};
