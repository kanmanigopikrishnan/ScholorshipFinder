import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

// ✅ Memoized reusable input field
const InputField = React.memo(({ label, name, type = 'text', value, onChange, required = true }) => (
  <div style={{ flex: '1', minWidth: '45%', marginBottom: '20px' }}>
    <label htmlFor={name} style={{ fontWeight: 'bold', color: '#34495e' }}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      required={required}
      style={{
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    />
  </div>
));

const SelectField = React.memo(({ label, name, options, value, onChange }) => (
  <div style={{ flex: '1', minWidth: '45%', marginBottom: '20px' }}>
    <label htmlFor={name} style={{ fontWeight: 'bold', color: '#34495e' }}>{label}</label>
    <select
      id={name}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
      }}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
));

const FileInputField = React.memo(({ label, name, onChange }) => (
  <div style={{ flex: '1', minWidth: '45%', marginBottom: '20px' }}>
    <label htmlFor={name} style={{ fontWeight: 'bold', color: '#34495e' }}>{label}</label>
    <input
      type="file"
      id={name}
      name={name}
      onChange={onChange}
      accept=".jpg,.jpeg,.png,.pdf"
      style={{
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    />
  </div>
));

const ScholarshipApplicationForm = () => {
  const { scholarshipId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    motherName: '',
    fatherName: '',
    occupationFather: '',
    occupationMother: '',
    caste: '',
    motherTongue: '',
    religion: '',
    nationality: '',
    residentialAddress: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
    educationLevel: '',
    institutionName: '',
    registerNumber: '',
    boardUniversity: '',
    academicScoreType: '',
    academicScore: '',
    annualFamilyIncome: '',
    incomeSource: '',
    bankName: '',
    branchName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    documents: {
      aadharPassport: null,
      incomeCertificate: null,
      communityCertificate: null,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: files[0],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'documents') {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    Object.keys(formData.documents).forEach((docKey) => {
      if (formData.documents[docKey]) {
        formDataToSubmit.append(docKey, formData.documents[docKey]);
      }
    });

    try {
      await api.post(`/apply/${scholarshipId}`, formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully!');
      navigate('/my-applications');
    } catch (error) {
      console.error(error);
      alert('Application failed. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#e6f2ff', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '700px', margin: 'auto', padding: '30px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', fontSize: '28px' }}>Scholarship Application Form</h2>
        <form onSubmit={handleSubmit}>

          {/* Personal Details */}
          <h3 style={{ marginBottom: '20px', color: '#3498db' }}>Personal Details</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            <SelectField label="Gender" name="gender" options={['Male', 'Female', 'Other']} value={formData.gender} onChange={handleChange} />
            <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
            <InputField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            <InputField label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
            <InputField label="Father's Occupation" name="occupationFather" value={formData.occupationFather} onChange={handleChange} />
            <InputField label="Mother's Occupation" name="occupationMother" value={formData.occupationMother} onChange={handleChange} />
            <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Residential Address" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} />
            <SelectField label="Caste" name="caste" options={['General', 'OBC', 'SC', 'ST']} value={formData.caste} onChange={handleChange} />
            <InputField label="Mother Tongue" name="motherTongue" value={formData.motherTongue} onChange={handleChange} />
            <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
            <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
            <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
            <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
          </div>

          {/* Academic Details */}
          <h3 style={{ marginBottom: '20px', marginTop: '30px', color: '#3498db' }}>Academic Details</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <SelectField label="Education Level" name="educationLevel" options={['School', 'Undergraduate', 'Postgraduate']} value={formData.educationLevel} onChange={handleChange} />
            <InputField label="Institution Name" name="institutionName" value={formData.institutionName} onChange={handleChange} />
            <InputField label="Register Number" name="registerNumber" value={formData.registerNumber} onChange={handleChange} />
            <InputField label="Board/University" name="boardUniversity" value={formData.boardUniversity} onChange={handleChange} />
            <SelectField label="Academic Score Type" name="academicScoreType" options={['CGPA', 'Percentage', 'Marks']} value={formData.academicScoreType} onChange={handleChange} />
            {formData.academicScoreType && (
              <InputField
                label={`Enter your ${formData.academicScoreType}`}
                name="academicScore"
                type={formData.academicScoreType === 'Marks' ? 'text' : 'number'}
                value={formData.academicScore}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Financial Info */}
          <h3 style={{ marginBottom: '20px', marginTop: '30px', color: '#3498db' }}>Financial Information</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <InputField label="Annual Family Income" name="annualFamilyIncome" value={formData.annualFamilyIncome} onChange={handleChange} />
            <SelectField label="Source of Income" name="incomeSource" options={['Govt', 'Private', 'Self-Employed', 'Others']} value={formData.incomeSource} onChange={handleChange} />
          </div>

          {/* Bank Info */}
          <h3 style={{ marginBottom: '20px', marginTop: '30px', color: '#3498db' }}>Bank Account Information</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <InputField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
            <InputField label="Branch Name" name="branchName" value={formData.branchName} onChange={handleChange} />
            <InputField label="Account Holder Name" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} />
            <InputField label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
            <InputField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
          </div>

          {/* Documents */}
          <h3 style={{ marginBottom: '20px', marginTop: '30px', color: '#3498db' }}>Upload Documents</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <FileInputField label="Aadhar/Passport" name="aadharPassport" onChange={handleFileChange} />
            <FileInputField label="Income Certificate" name="incomeCertificate" onChange={handleFileChange} />
            <FileInputField label="Community Certificate" name="communityCertificate" onChange={handleFileChange} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button
              type="submit"
              style={{
                padding: '12px 30px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScholarshipApplicationForm;
