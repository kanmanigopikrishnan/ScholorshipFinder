const express = require('express');
const router = express.Router();
const applyController = require('../controllers/applyController');
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../middleware/upload'); // multer setup

router.post('/:scholarshipId', authenticateToken, upload.fields([
  { name: 'aadharPassport', maxCount: 1 },
  { name: 'incomeCertificate', maxCount: 1 },
  { name: 'communityCertificate', maxCount: 1 },
]), applyController.applyScholarship);

module.exports = router;