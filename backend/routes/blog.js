const express = require('express')

const {getBlogs, getSingleBlog, getNbOfLikes, getNbOfDislikes, getBlogByCategory, getBlogByTitle, getPopularBlogs, createBlog, deleteBlog, updateBlog} = require('../controllers/blogController');
// 1 point means folder in directory backend
//2 points means folder is in same folder as backend

const router = express.Router()

router.get('/', getBlogs)

router.get('/popularBlogs', getPopularBlogs)

router.get('/:id', getSingleBlog)

router.get('/nbOfLikes', getNbOfLikes)

router.get('/nbOfDislikes', getNbOfDislikes)

router.get('/:id', getSingleBlog)

router.get('/category/:category', getBlogByCategory)

router.get('/title/:title', getBlogByTitle)


router.post('/createBlog', createBlog)

router.delete('/deleteBlog/:id', deleteBlog)

router.patch('/updateBlog/:id', updateBlog)

module.exports = router;