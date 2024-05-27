const axios = require('axios');
const { sequelize, User, Post, Comment } = require('../models'); // Assuming you have Sequelize models defined
const bcrypt = require('bcrypt');
async function seedDatabase() {
  try {
    // Drop all existing tables
    await sequelize.sync({ force: true });

    // Fetch users from the API
    const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
    
    // Insert users into the database
    await Promise.all(users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.username, 10); // Replace 'your_password_here' with the actual password
      await User.create({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: hashedPassword // Generate a random password
        // Add other user properties as needed
      });
    }));

    // Fetch posts from the API
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');

    // Insert posts into the database
    await Promise.all(posts.map(async (post) => {
      await Post.create({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId
      });
    }));

    // Fetch comments from the API
    const { data: comments } = await axios.get('https://jsonplaceholder.typicode.com/comments');

    // Insert comments into the database
    await Promise.all(comments.map(async (comment) => {
      await Comment.create({
        id: comment.id,
        postId: comment.postId,
        name: comment.name,
        email: comment.email,
        body: comment.body
        // Add other comment properties as needed
      });
    }));

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Call the seedDatabase function to initiate the seeding process
seedDatabase();
