const express = require("express");
const categoriesRoute = express.Router();
const { getAllCategories } = require("../controllers/categoriesController");

// Define route for getting all categories
<<<<<<< HEAD
categoriesRoute.get('/', getAllCategories);
=======
categoriesRoute.get("/", getAllCategories);
>>>>>>> Roni

module.exports = categoriesRoute;
