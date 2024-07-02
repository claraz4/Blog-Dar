const mongoose = require("mongoose");

const schema = mongoose.Schema;

const { User } = require("./userModel");

const imgSchema = new mongoose.Schema(
  {
    data: {
      type: Buffer, // Store file data as Buffer
      required: true,
    },
    contentType: {
      type: String, // MIME type of the file (e.g., 'image/jpeg', 'image/png')
      required: true,
    },
    uploadedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Img", imgSchema);
