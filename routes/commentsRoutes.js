const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authMiddleware')
// Import the User model
const { User,Post } = require('../models')

const {addComment,getCommentsByPostId,updateComment,deleteComment} = require('../controllers/commentsController')

// Route to get allComments by ID
router.get('/posts/:id/comments', authenticateToken, getCommentsByPostId)

// Route to add a new comment
router.post('/posts/:id/comments', authenticateToken, addComment)

// Route to update a comment
router.patch('/posts/:postId/comments/:commentId', authenticateToken, updateComment)

// Route to delete a comment 
router.delete('/posts/:postId/comments/:commentId',authenticateToken, deleteComment)

module.exports = router
