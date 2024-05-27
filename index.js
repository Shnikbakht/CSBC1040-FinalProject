const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');

// Import routers
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

// Middleware to parse JSON request body
app.use(express.json());

// Route to handle user-related requests
app.get('/', (req, res) => {
  res.send('Welcome to CSBC1040-Final Project!');
});
app.use('/', usersRoutes);
app.use('/', postsRoutes);
app.use('/', commentsRoutes);

// Connect to the database and start the server
async function startServer() {
  try {
    // Determine the database configuration based on the environment
    const { username, password, database, host, port } =
      process.env.NODE_ENV === 'test'
        ? require('./config/config').test
        : require('./config/config').development;

    // Authenticate with the database
    await db.sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );

    // Synchronize all defined models with the database
    await db.sequelize.sync();
    console.log('All models have been synchronized with the database.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Exit the process if unable to connect to the database
    process.exit(1);
  }
}

// Call the startServer function to connect to the database and start the server
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
