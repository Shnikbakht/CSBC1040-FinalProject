const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authMiddleware')
// Import the User model
const { User,Post } = require('../models')

const {addPost, getAllPosts,getAllPostByUserId,getByPostId,updatePost} = require('../controllers/postsController')

//Route to get all posts
router.get('/posts',authenticateToken, getAllPosts)


router.get('/posts',authenticateToken, getAllPostByUserId)

router.get('/posts/:id',authenticateToken, getByPostId)

// Route to add a new post
router.post('/posts', authenticateToken, addPost)

// Route to update a post by ID
router.patch('/posts/:id', authenticateToken, updatePost)

module.exports = router
