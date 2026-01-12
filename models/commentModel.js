const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comment", commentSchema);
