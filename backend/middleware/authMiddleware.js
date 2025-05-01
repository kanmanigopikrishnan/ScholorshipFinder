const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // MySQL connection pool

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally fetch user details from the DB (not necessary if token contains sufficient data)
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user object to req.user so it can be accessed by routes
    req.user = rows[0];
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
