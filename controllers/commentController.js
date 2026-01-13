const Comment = require("../models/commentModel");

const getComments = async (req, res) => {
  const filter = {};
  if (req.query.postId) {
    filter.postId = req.query.postId;
  }

  if (req.query.senderId) {
    filter.senderId = req.query.senderId;
  }

  try {
    res.json(await Comment.find(filter));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const newComment = new Comment({
      content: req.body.content,
      postId: req.body.postId,
      senderId: req.body.senderId,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        postId: req.body.postId,
        senderId: req.body.senderId,
      },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  deleteComment,
  updateComment,
};
