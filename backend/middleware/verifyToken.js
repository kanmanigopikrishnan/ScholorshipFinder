const jwt = require('jsonwebtoken'); // Make sure you have jwt installed

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Invalid or expired token:', error);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
