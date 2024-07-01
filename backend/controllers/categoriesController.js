const mongoose = require('mongoose')

const categoriesModel = require('../models/categoriesModel')

const getAllCategories = async (req,res) => {
    try {
        const categories = await categoriesModel.find({});
        return res.status(200).json(categories);
    } catch (err) {
        // Handle errors appropriately
        console.error('Error fetching categories:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllCategories };