const express = require('express');
const router = express.Router();
const scholarshipController = require('../controllers/scholarshipController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');

// ✅ Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Get all scholarships (protected)
router.get('/', authenticateToken, scholarshipController.getAllScholarships);

// ✅ Apply for a scholarship (protected + with file upload)
router.post(
  '/apply/:scholarshipId',
  authenticateToken,
  upload.fields([
    { name: 'aadharPassport', maxCount: 1 },
    { name: 'incomeCertificate', maxCount: 1 },
    { name: 'communityCertificate', maxCount: 1 }
  ]),
  scholarshipController.applyForScholarship
);

// ✅ Get recommended scholarships
router.get('/recommended/:userId', scholarshipController.getRecommendedScholarships);

module.exports = router;
