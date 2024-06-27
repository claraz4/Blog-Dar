const mongoose = require('mongoose')

const blog = require('../models/blogModel')

const getBlogs = async (req, res) => {
    const blogs = await blog.find({}).sort({createdAt:-1}) // descending order newest to oldest
    res.status(200).json(blogs)
};

const getSingleBlog = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such blog'})
    }
    const Blog = await blog.findById(id)
    if(!Blog){
        return res.status(404).json({error: 'No such blog'})
    }else{
        res.status(200).json(Blog)
    }
}

const getBlogByCategory = async (req,res) => {
    const {category} = req.params
    const categories = category.split(',');

    const Blog = await blog.find({category: { $in: categories }})
    if(!Blog){
        return res.status(404).json({error: 'No such blog'})
    }
    return res.status(200).json(Blog)
}

const createBlog = async (req,res) => {
    const {title,author,category,content} = req.body
    try{
        const Blog = await blog.create({title,author,category,content})
        res.status(200).json(Blog)
    }catch(error){
        res.status(400).json({error: error.message})
    }
} 

const deleteBlog = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such blog to delete'})
    }
    const Blog = await blog.findOneAndDelete({_id:id})

    if(!Blog){
        return res.status(404).json({error: 'No such blog'})
    }else{
        return res.status(200).json('Deleted Blog: '+ Blog)
    }
}

const updateBlog = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json('No such blog to update')
    }
    const Blog = await blog.findOneAndUpdate({_id:id}, req.body, { new: true }); // the new is to update the Blog directly

    if (!Blog) {
        return res.status(404).json({ error: 'No such blog' });
    }

    return res.status(200).json(Blog)
}

module.exports = {getBlogs, getSingleBlog, getBlogByCategory, createBlog, deleteBlog, updateBlog}