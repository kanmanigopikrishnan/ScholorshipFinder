const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Register route
router.post('/register', register);

// Logout route
router.post('/logout', logout);  // Add the logout route

module.exports = router;