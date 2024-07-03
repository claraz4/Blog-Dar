const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    // img: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Img",
    // },
    likedby: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikedby: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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
