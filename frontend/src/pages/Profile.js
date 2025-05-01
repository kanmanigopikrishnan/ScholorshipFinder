import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data);
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>
      <p style={styles.text}>
        <strong>Name:</strong> {user.name}<br />
        <strong>Email:</strong> {user.email}<br />
        <strong>Contact No :</strong> {user.contactno}<br />
        <strong>Scholarships Applied:</strong> {user.totalApplications || 0}<br />
        <strong>Approved:</strong> {user.approvedCount || 0}
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#E6E6FA',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#4b0082',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#333',
  },
};

export default Profile;