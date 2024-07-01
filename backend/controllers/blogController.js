const mongoose = require("mongoose");

const blog = require("../models/blogModel");

const nbOfLikes = {
  $addFields: {
    likedByCount: { $size: { $ifNull: ["$likedby", []] } },
    // Add more common fields if needed
  },
};

const nbOfDislikes = {
  $addFields: {
    dislikedByCount: { $size: { $ifNull: ["$dislikedby", []] } },
    // Add more common fields if needed
  },
};

const filterByPopularity = [
  nbOfLikes,
  nbOfDislikes,
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
];

const getBlogs = async (req, res) => {
  const blogs = await blog.find({ $sort: { createdAt: -1 } }); // sort newest to oldest
  res.status(200).json(blogs);
};

const getPopularBlogs = async (req, res) => {
  try {
    const blogs = await blog.aggregate(filterByPopularity);

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getSingleBlog = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such blog" });
//   }
//   const Blog = await blog.findById(id);
//   if (!Blog) {
//     return res.status(404).json({ error: "No such blog" });
//   } else {
//     res.status(200).json(Blog);
//   }
// };

const getBlogByCategory = async (req, res) => {
  const { category } = req.params;

  const Blog = await blog.find({ category: category });
  if (!Blog) {
    return res.status(404).json({ error: "No such blog" });
  }
  return res.status(200).json(Blog);
};

const getBlogByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const blogs = await blog.find({ title: { $regex: title, $options: "i" } });

    if (blogs.length === 0) {
      return res.status(404).json({ error: "No such blog" });
    }

    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
const createBlog = async (req, res) => {
  const { title, author, category, content, likedby, dislikedby } = req.body;
  try {
    const Blog = await blog.create({
      title,
      author,
      category,
      content,
      likedby,
      dislikedby,
    });
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
  }); // the new is to update the Blog directly

  if (!Blog) {
    return res.status(404).json({ error: "No such blog" });
  }

  return res.status(200).json(Blog);
};

module.exports = {
  getBlogs,
  //getSingleBlog,
  getBlogByCategory,
  getBlogByTitle,
  getPopularBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
};
