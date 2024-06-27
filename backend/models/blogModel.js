const mongoose = require('mongoose')

const schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    
    }
}, {timestamps:true} 
)

module.exports = mongoose.model('Blog', blogSchema)