const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/userController');

// Get logged-in user's profile
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;
