const express = require('express');
const router = express.Router();
const { getAllScholarships, getUserApplications, getDashboardData } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch dashboard data (Total scholarships, applications, approved status)
router.get('/dashboard', authMiddleware, getDashboardData);

// Fetch all scholarships
router.get('/scholarships', authMiddleware, getAllScholarships);

// Fetch applications for the logged-in user
router.get('/applications/my', authMiddleware, getUserApplications);

module.exports = router;