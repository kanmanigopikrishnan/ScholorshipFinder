const pool = require('../config/db');

// Apply for a scholarship
const applyForScholarship = async (req, res) => {
  const { scholarshipId } = req.params;

  // Ensure user is authenticated
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user not authenticated' });
  }

  const {
    fullName,
    gender,
    dob,
    motherName,
    fatherName,
    occupationFather,
    occupationMother,
    caste,
    motherTongue,
    religion,
    nationality,
    residentialAddress,
    state,
    zipCode,
    email,
    phone,
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

  const aadharPassport = req.files?.aadharPassport?.[0]?.path || null;
  const incomeCertificate = req.files?.incomeCertificate?.[0]?.path || null;
  const communityCertificate = req.files?.communityCertificate?.[0]?.path || null;

  try {
    const query = `
      INSERT INTO applications (
        scholarshipId, userId, fullName, gender, dob, motherName, fatherName, occupationFather, occupationMother,
        caste, motherTongue, religion, nationality, residentialAddress, state, zipCode, email, phone,
        educationLevel, institutionName, registerNumber, boardUniversity, academicScoreType, academicScore,
        annualFamilyIncome, incomeSource, bankName, branchName, accountHolderName, accountNumber, ifscCode,
        aadharPassport, incomeCertificate, communityCertificate, status, appliedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())
    `;

    const [result] = await pool.execute(query, [
      scholarshipId,
      userId,
      fullName,
      gender,
      dob,
      motherName,
      fatherName,
      occupationFather,
      occupationMother,
      caste,
      motherTongue,
      religion,
      nationality,
      residentialAddress,
      state,
      zipCode,
      email,
      phone,
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
      communityCertificate
    ]);

    res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
  } catch (error) {
    console.error('Error applying for scholarship:', error.message);
    res.status(500).json({ message: 'Failed to apply for scholarship' });
  }
};

// Fetch user's applications
const getUserApplications = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: user not authenticated' });
  }

  try {
    const query = `
      SELECT applications.*, scholarships.scholarship_name
      FROM applications
      JOIN scholarships ON applications.scholarshipId = scholarships.id
      WHERE applications.userId = ?
    `;

    const [applications] = await pool.execute(query, [userId]);

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

module.exports = {
  applyForScholarship,
  getUserApplications,
};
