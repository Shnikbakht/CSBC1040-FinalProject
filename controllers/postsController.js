const {Post} = require('../models'); // Assuming you have a User model defined in user.js
const jwt = require('jsonwebtoken');
// Route for user login

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllPostByUserId = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.user.id } });
    if (!posts) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ where: { id: req.params.id} });
    if (!post) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const addPost = async (req, res) => {
  try {
    const newPost = {
      userId: req.user.id,
      title: req.body.title,
      body: req.body.body
    }; // Assuming the request body contains the new user data
    const post = await Post.create(newPost);
    res.status(201).json(post); // Respond with status 201 Created
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH endpoint to update a post
const updatePost = async (req, res) => {
  try {
    // Check if the post exists and belongs to the authenticated user
    const post = await Post.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!post) {
      return res
        .status(404)
        .json({
          error: 'Post not found or does not belong to the authenticated user'
        });
    }

    // Update the post with the new data
    await post.update(req.body);

    // Retrieve the updated post
    const updatedPost = await Post.findByPk(req.params.id);

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllPostByUserId,
  getByPostId,
  getAllPosts,
  addPost,
  updatePost,
};
