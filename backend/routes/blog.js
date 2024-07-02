const express = require("express");

const auth = require("../middleware/requireAuth");

const {
  getBlogs,
  getUserBlogs,
  getBlogByCategory,
  getBlogByTitle,
  getPopularBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");
// 1 point means folder in directory backend
//2 points means folder is in same folder as backend

// require auth for all workout routes

const router = express.Router();

//router.use(auth);

router.get("/", getBlogs);

router.get("/popularBlogs", getPopularBlogs);

router.get("/userBlogs", auth, getUserBlogs);

router.get("/category/:category", getBlogByCategory);

router.get("/title/:title", getBlogByTitle);

router.post("/createBlog", createBlog);

router.delete("/deleteBlog/:id", deleteBlog);

router.patch("/updateBlog/:id", updateBlog);

module.exports = router;