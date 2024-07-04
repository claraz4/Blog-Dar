const express = require("express");

const auth = require("../middleware/requireAuth");

const {
  getBlogs,
  getUserBlogs,
  //getBlogByCategory,
  //getBlogByTitle,
  getBlogsByFilter,
  getPopularBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  likedBlog,
  dislikedBlog,
  getBlogByTitleAndCategory
} = require("../controllers/blogController");
// 1 point means folder in directory backend
//2 points means folder is in same folder as backend

// require auth for all workout routes

const router = express.Router();

//router.use(auth);

router.get("/", getBlogs);

router.get("/popularBlogs", getPopularBlogs);

router.get("/userBlogs", auth, getUserBlogs);

//router.get("/category/:category", getBlogByCategory);

//router.get("/title/:title", getBlogByTitle);

router.get("/filtered", getBlogsByFilter);

router.get("/:title/:category", getBlogByTitleAndCategory);

router.post("/createBlog", auth, createBlog);

router.post("/like", auth, likedBlog);

router.post("/dislike", auth, dislikedBlog);

router.delete("/deleteBlog/:id", auth, deleteBlog);

router.patch("/updateBlog/:id", auth, updateBlog);

module.exports = router;
