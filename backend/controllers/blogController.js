const mongoose = require('mongoose')

const blog = require('../models/blogModel')

const getBlogs = (req, res) => {
    try {
        // You can directly respond with a JSON message
        res.json({ message: 'Get all Blogs' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getBlogs}