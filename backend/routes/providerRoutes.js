const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

// Auth
router.post('/register', providerController.registerProvider);
router.post('/login', providerController.loginProvider);

// Scholarship management
router.post('/scholarships', providerController.postScholarship);
router.get('/scholarships', providerController.getProviderScholarships);

// Application view
router.get('/applications/:scholarshipId', providerController.getApplicants);

module.exports = router;
