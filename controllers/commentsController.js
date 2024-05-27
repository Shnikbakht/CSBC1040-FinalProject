const { Post, Comment } = require('../models'); // Importing models for  Post, and Comment
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library

// Function to get comments by user ID
const getCommentsByPostId = async (req, res) => {
  try {
    // Check if the post exists and belongs to the authenticated user
    const post = await Post.findOne({
      where: { id: req.params.id }
    });

    // If the post is not found, return a 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Retrieve all comments associated with the post
    const comments = await Comment.findAll({
      where: { postId: req.params.id }
    });

    // Respond with the retrieved comments
    res.json(comments);
  } catch (error) {
    // Handling errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to add a new comment
const addComment = async (req, res) => {
  try {
    // Check if the post exists
    const post = await Post.findByPk(req.params.id);

    // If the post is not found, return a 404 error
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a new comment object from the request body
    const newComment = {
      postId: req.params.id,
      name: req.user.name,
      email: req.user.email,
      body: req.body.body
    };

    // Create a new comment associated with the post
    const comment = await Comment.create(newComment);

    // Respond with the newly created comment and status 201 Created
    res.status(201).json(comment);
  } catch (error) {
    // Handling errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update a comment
const updateComment = async (req, res) => {
  try {
    // Check if the post exists and belongs to the authenticated user
    const post = await Post.findOne({
      where: { id: req.params.postId, userId: req.user.id }
    });

    // If the post is not found or does not belong to the authenticated user, return a 404 error
    if (!post) {
      return res.status(404).json({
        error: 'Post not found or does not belong to the authenticated user'
      });
    }

    // Check if the comment exists and belongs to the specified post
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, postId: req.params.postId }
    });

    // If the comment is not found or does not belong to the specified post, return a 404 error
    if (!comment) {
      return res.status(404).json({
        error: 'Comment not found or does not belong to the specified post'
      });
    }

    // Update the comment with the new data
    await comment.update(req.body);

    // Retrieve the updated comment
    const updatedComment = await Comment.findByPk(req.params.commentId);

    // Respond with the updated comment
    res.json(updatedComment);
  } catch (error) {
    // Handling errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a comment
const deleteComment = async (req, res) => {
  try {
    // Check if the post exists and belongs to the authenticated user
    const post = await Post.findOne({
      where: { id: req.params.postId, userId: req.user.id }
    });

    // If the post is not found or does not belong to the authenticated user, return a 404 error
    if (!post) {
      return res.status(404).json({
        error: 'Post not found or does not belong to the authenticated user'
      });
    }

    // Check if the comment exists and belongs to the specified post
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, postId: req.params.postId }
    });

    // If the comment is not found or does not belong to the specified post, return a 404 error
    if (!comment) {
      return res.status(404).json({
        error: 'Comment not found or does not belong to the specified post'
      });
    }

    // Delete the comment
    await comment.destroy();

    // Respond with a success message
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    // Handling errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Exporting the functions to be used in routes
module.exports = {
  getCommentsByPostId,
  addComment,
  updateComment,
  deleteComment
};
