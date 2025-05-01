const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken'); // Middleware to verify admin JWT

// Get admin stats
router.get('/stats', verifyToken, adminController.getStats);

// Get list of users
router.get('/users', verifyToken, adminController.getUsers);

// Get list of scholarships
router.get('/scholarships', verifyToken, adminController.getScholarships);

// Get list of applications
router.get('/applications', verifyToken, adminController.getApplications);

// Delete a user by ID
router.delete('/users/:id', verifyToken, adminController.deleteUser);

// Delete a scholarship by ID
router.delete('/scholarships/:id', verifyToken, adminController.deleteScholarship);

// Update application status
router.put('/applications/:id', verifyToken, adminController.updateApplicationStatus);

module.exports = router;
