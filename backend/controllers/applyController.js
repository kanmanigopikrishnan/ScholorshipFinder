const db = require('../config/db');

exports.applyScholarship = async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    console.log('Authenticated user in apply route:', req.user);
    const userId = req.user.id; // from authenticateToken
    const {
      fullName, gender, dob, motherName, fatherName, occupationFather, occupationMother,
      caste, motherTongue, religion, nationality, residentialAddress, state, zipCode,
      email, phone, educationLevel, institutionName, registerNumber, boardUniversity,
      academicScoreType, academicScore, annualFamilyIncome, incomeSource,
      bankName, branchName, accountHolderName, accountNumber, ifscCode
    } = req.body;

    // Uploaded file paths
    const aadharPassport = req.files['aadharPassport'] ? req.files['aadharPassport'][0].filename : null;
    const incomeCertificate = req.files['incomeCertificate'] ? req.files['incomeCertificate'][0].filename : null;
    const communityCertificate = req.files['communityCertificate'] ? req.files['communityCertificate'][0].filename : null;

    const [result] = await db.query(
      `INSERT INTO applications (
        userId, scholarshipId, fullName, gender, dob, motherName, fatherName, occupationFather,
        occupationMother, caste, motherTongue, religion, nationality, residentialAddress, state,
        zipCode, email, phone, educationLevel, institutionName, registerNumber, boardUniversity,
        academicScoreType, academicScore, annualFamilyIncome, incomeSource, bankName, branchName,
        accountHolderName, accountNumber, ifscCode, aadharPassport, incomeCertificate, communityCertificate, applicationDate, status
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, NOW(), 'Pending')`,
      [
        userId, scholarshipId, fullName, gender, dob, motherName, fatherName, occupationFather,
        occupationMother, caste, motherTongue, religion, nationality, residentialAddress, state,
        zipCode, email, phone, educationLevel, institutionName, registerNumber, boardUniversity,
        academicScoreType, academicScore, annualFamilyIncome, incomeSource, bankName, branchName,
        accountHolderName, accountNumber, ifscCode, aadharPassport, incomeCertificate, communityCertificate
      ]
    );

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};