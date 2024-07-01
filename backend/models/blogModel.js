const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { User } = require("./userModel");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    author:{
        type:String,
        required:true,
        default: "Jane Doe"
=======
    author: {
      type: String,
      required: true,
>>>>>>> Roni
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    likedby: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    dislikedby: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    datePublished: {
      type: Date,
      default: Date.now(),
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
