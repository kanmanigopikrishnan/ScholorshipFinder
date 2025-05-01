const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Get all applications for the logged-in user
router.get('/my-applications', authenticateToken, (req,res,next) => {
    console.log("Hit/my-applications route");
    next();
},applicationController.getUserApplications);

// Apply for a scholarship
router.post('/apply/:scholarshipId', authenticateToken, 
    upload.fields([
        { name: 'aadharPassport', maxCount: 1},
        { name: 'incomeCertificate', maxCount: 1},
        { name: 'communityCertificate', maxCount: 1}
    ]),
    applicationController.applyForScholarship);

module.exports = router;