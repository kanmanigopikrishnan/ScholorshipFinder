import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        navigate('/login');
        return;
      }

      try {
        const res = await api.get('/scholarships', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setScholarships(res.data);
        } else {
          setError('Failed to load scholarships. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError('An error occurred while fetching scholarships.');
      }
    };

    fetchScholarships();
  }, [navigate]);

  // Updated handleApply to navigate to form
  const handleApply = (scholarshipId) => {
    navigate(`/apply/${scholarshipId}`);
  };

  const handleNavigate = (route) => navigate(route);

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#d1f1c9',
      padding: '12px 25px',
      borderBottom: '1px solid #ccc',
    },
    logo: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#2d572c',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#2d572c',
      fontWeight: '500',
      fontSize: '16px',
    },
    container: {
      maxWidth: '1100px',
      margin: '30px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    greeting: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#444',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '25px',
      color: '#2d572c',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    card: {
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    cardLeft: {
      flex: 1,
    },
    cardRight: {
      marginLeft: '30px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    appliedButton: {
      padding: '10px 20px',
      backgroundColor: 'gray',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'not-allowed',
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginBottom: '20px',
    },
    scholarshipName: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2d572c',
    },
    scholarshipInfo: {
      marginBottom: '6px',
      fontSize: '16px',
      color: '#555',
    },
  };

  return (
    <>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.logo}>Scholar<span style={{ color: 'black' }}>Pathway</span>Hub</div>
        <div style={styles.navLinks}>
          <span style={styles.navLink} onClick={() => handleNavigate('/profile')}>Profile</span>
          <span style={styles.navLink} onClick={() => handleNavigate('/logout')}>Logout</span>
        </div>
      </div>

      {/* Page Content */}
      <div style={styles.container}>
        <div style={styles.greeting}>🎓 Welcome to the Scholarship Portal</div>
        <h2 style={styles.title}>Available Scholarships</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.list}>
          {scholarships.length > 0 ? (
            scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.cardHover.transform;
                  e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div style={styles.cardLeft}>
                  <div style={styles.scholarshipName}>{scholarship.scholarship_name}</div>
                  <div style={styles.scholarshipInfo}><strong>Eligibility:</strong> {scholarship.eligibility}</div>
                  <div style={styles.scholarshipInfo}><strong>Amount:</strong> ₹{scholarship.amount}</div>
                  <div style={styles.scholarshipInfo}><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</div>
                </div>
                <div style={styles.cardRight}>
                  <button style={styles.button} onClick={() => handleApply(scholarship.id)}>Apply Now</button>
                </div>
              </div>
            ))
          ) : (
            <p>No scholarships available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ScholarshipList;