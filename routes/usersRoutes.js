const express = require('express')
const router = express.Router()
// Import the User model
const { User,Post } = require('../models')

const {loginHandler, getAllUsers} = require('../controllers/usersController')

// Route to get all users
router.get('/users', getAllUsers)

// Route for user login
router.post('/users/login', loginHandler)

// Route to get all users
module.exports = router
