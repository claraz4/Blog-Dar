const express = require('express')

const {getBlogs} = require('../controllers/blogController');
// 1 point means folder in directory backend
//2 points means folder is in same folder as backend

const router = express.Router()

router.get('/', getBlogs)

module.exports = router;