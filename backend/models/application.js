// controllers/applicationController.js

const pool = require('../config/db');

const createApplication = async (req, res) => {
  const { scholarshipId } = req.params;
  const userId = req.userId;

  const {
    fullName,
    gender,
    dob,
    fatherName,
    motherName,
    occupationFather,
    occupationMother,
    email,
    phone,
    residentialAddress,
    caste,
    motherTongue,
    religion,
    nationality,
    state,
    zipCode,
    educationLevel,
    institutionName,
    registerNumber,
    boardUniversity,
    academicScoreType,
    academicScore,
    annualFamilyIncome,
    incomeSource,
    bankName,
    branchName,
    accountHolderName,
    accountNumber,
    ifscCode,
  } = req.body;

  // Files (uploaded documents)
  const aadharPassport = req.files?.aadharPassport?.[0]?.path;
  const incomeCertificate = req.files?.incomeCertificate?.[0]?.path;
  const communityCertificate = req.files?.communityCertificate?.[0]?.path;

  if ( !aadharPassport || !incomeCertificate || !communityCertificate) {
    return res.status(400).json({ message: 'All documents are required' });
  }

  try {
    const query = `
      INSERT INTO applications 
      (scholarshipId, userId, fullName, gender, dob, fatherName, motherName, occupationFather, occupationMother, email, phone, residentialAddress, caste, motherTongue, religion, nationality, state, zipCode, educationLevel, institutionName, registerNumber, boardUniversity, academicScoreType, academicScore, annualFamilyIncome, incomeSource, bankName, branchName, accountHolderName, accountNumber, ifscCode, aadharPassport, incomeCertificate, communityCertificate, status, appliedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await pool.execute(query, [
      scholarshipId,
      userId,
      fullName,
      gender,
      dob,
      fatherName,
      motherName,
      occupationFather,
      occupationMother,
      email,
      phone,
      residentialAddress,
      caste,
      motherTongue,
      religion,
      nationality,
      state,
      zipCode,
      educationLevel,
      institutionName,
      registerNumber,
      boardUniversity,
      academicScoreType,
      academicScore,
      annualFamilyIncome,
      incomeSource,
      bankName,
      branchName,
      accountHolderName,
      accountNumber,
      ifscCode,
      aadharPassport,
      incomeCertificate,
      communityCertificate,
      'Pending', // initial status
    ]);

    res.status(201).json({ message: 'Application created successfully', applicationId: result.insertId });
  } catch (error) {
    console.error('Error creating application:', error.message);
    res.status(500).json({ error: 'Failed to create application' });
  }
};

// Get all applications for a user
const getUserApplications = async (req, res) => {
  const userId = req.userId;

  try {
    const query = `SELECT * FROM applications WHERE userId = ?`;
    const [applications] = await pool.execute(query, [userId]);

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const query = `UPDATE applications SET status = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [status, applicationId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application status updated successfully' });
  } catch (error) {
    console.error('Error updating application status:', error.message);
    res.status(500).json({ error: 'Failed to update application status' });
  }
};

module.exports = {
  createApplication,
  getUserApplications,
  updateApplicationStatus,
};
