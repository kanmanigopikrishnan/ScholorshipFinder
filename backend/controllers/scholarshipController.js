const Scholarship = require('../models/scholarship');
const pool = require('../config/db');

// ✅ Fetch all scholarships
const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.getAllScholarships();
    return res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return res.status(500).json({ message: 'Failed to fetch scholarships' });
  }
};

// ✅ Apply for a scholarship
const applyForScholarship = async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      console.warn('User ID missing from token');
      return res.status(401).json({ message: 'Unauthorized: Invalid user token' });
    }

    // Check if scholarship exists
    const scholarship = await Scholarship.getScholarshipById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }

    // Optional: Check if already applied
    const [existing] = await pool.query(
      'SELECT * FROM applications WHERE userId = ? AND scholarshipId = ?',
      [userId, scholarshipId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: 'You have already applied for this scholarship' });
    }

    // Destructure all expected fields from req.body
    const {
      fullName, gender, dob, motherName, fatherName,
      occupationFather, occupationMother, caste, motherTongue,
      religion, nationality, residentialAddress, state, zipCode,
      email, phone, educationLevel, institutionName, registerNumber,
      boardUniversity, academicScoreType, academicScore,
      annualFamilyIncome, incomeSource, bankName, branchName,
      accountHolderName, accountNumber, ifscCode
    } = req.body;

    // Handle uploaded files from multer
    const aadharPassport = req.files?.aadharPassport?.[0]?.filename || '';
    const incomeCertificate = req.files?.incomeCertificate?.[0]?.filename || '';
    const communityCertificate = req.files?.communityCertificate?.[0]?.filename || '';

    // Insert into applications table
    const [result] = await pool.query(
      `INSERT INTO applications (
        userId, scholarshipId, fullName, gender, dob, motherName, fatherName,
        occupationFather, occupationMother, caste, motherTongue, religion, nationality,
        residentialAddress, state, zipCode, email, phone, educationLevel, institutionName,
        registerNumber, boardUniversity, academicScoreType, academicScore,
        annualFamilyIncome, incomeSource, bankName, branchName,
        accountHolderName, accountNumber, ifscCode,
        aadharPassport, incomeCertificate, communityCertificate,
        applicationDate, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'Pending')`,
      [
        userId, scholarshipId, fullName, gender, dob, motherName, fatherName,
        occupationFather, occupationMother, caste, motherTongue, religion, nationality,
        residentialAddress, state, zipCode, email, phone, educationLevel, institutionName,
        registerNumber, boardUniversity, academicScoreType, academicScore,
        annualFamilyIncome, incomeSource, bankName, branchName,
        accountHolderName, accountNumber, ifscCode,
        aadharPassport, incomeCertificate, communityCertificate
      ]
    );

    return res.status(201).json({
      message: `Successfully applied for scholarship ${scholarshipId}`,
      applicationId: result.insertId,
    });

  } catch (error) {
    console.error('Error applying for scholarship:', error);
    return res.status(500).json({ message: 'Failed to apply for scholarship' });
  }
};

// ✅ Recommend scholarships based on user profile
const getRecommendedScholarships = async (req, res) => {
  try {
    const { userId } = req.params;

    const [userResult] = await pool.query(
      `SELECT location, family_income, marks_percentage FROM users WHERE id = ?`,
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { location, family_income, marks_percentage } = userResult[0];

    const [recommendations] = await pool.query(
      `SELECT * FROM scholarships
       WHERE location = ?
         AND income_limit >= ?
         AND minimum_marks <= ?
         AND deadline >= CURDATE()`,
      [location, family_income, marks_percentage]
    );

    return res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommended scholarships:', error);
    return res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
};

module.exports = {
  getAllScholarships,
  applyForScholarship,
  getRecommendedScholarships,
};
