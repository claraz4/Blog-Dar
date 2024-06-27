const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    
    },
    category:{
        type: Array,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    // likedBy:{

    // }
    nbOfLikes:{
        type:Number,
        default: 0
    },
    nbOfDislikes:{
        type:Number,
        default: 0
    }
    // datePublished:{

    // }
}, {timestamps:true} 
)

module.exports = mongoose.model('blog', blogSchema)