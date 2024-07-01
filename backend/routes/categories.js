
const express = require('express');
const categoriesRoute = express.Router();
const { getAllCategories } = require('../controllers/categoriesController');

// Define route for getting all categories
categoriesRoute.get('/getAllCategories', getAllCategories);

module.exports = categoriesRoute;
