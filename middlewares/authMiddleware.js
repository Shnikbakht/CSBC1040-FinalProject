const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assuming you have a User model defined
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // No token provided

    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findOne({ where: { id: decoded.id,username: decoded.username } });
    if (!user) return res.sendStatus(403); // Invalid token

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authenticateToken;
