import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const styles = {
    wrapper: {
      display: 'flex',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
    },
    sidebar: {
      width: '220px',
      backgroundColor: '#eafde5',
      padding: '20px',
      borderRight: '1px solid #c8e6c9',
    },
    sidebarItem: {
      padding: '12px 0',
      cursor: 'pointer',
      color: '#2d572c',
      fontWeight: '500',
    },
    navbar: {
      position: 'sticky',
      top: 0,
      width: '100%',
      backgroundColor: '#d1f1c9',
      padding: '12px 20px',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#2d572c',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      cursor: 'pointer',
      color: '#2d572c',
      fontWeight: '500',
    },
    content: {
      flexGrow: 1,
      padding: '20px',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    cards: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    card: {
      flex: '1 1 200px',
      backgroundColor: '#f4fff1',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      borderLeft: '5px solid #4caf50',
    },
    cardTitle: {
      fontSize: '18px',
      marginBottom: '10px',
      color: '#2d572c',
    },
    cardValue: {
      fontSize: '22px',
      fontWeight: 'bold',
    },
  };

  return (
    <>
      <div style={styles.navbar}>
        <div style={styles.logo}>Scholar<span style={{ color: 'black' }}>Pathway</span>Hub</div>
        <div style={styles.navLinks}>
          <span style={styles.navLink} onClick={() => navigate('/')}>Home</span>
          <span style={styles.navLink} onClick={() => navigate('/about')}>About Us</span>
          <span style={styles.navLink} onClick={() => navigate('/contact')}>Contact Us</span>
        </div>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarItem} onClick={() => navigate('/scholarships')}>View Scholarships</div>
          <div style={styles.sidebarItem} onClick={() => navigate('/my-applications')}>My Applications</div>
          <div style={styles.sidebarItem} onClick={() => navigate('/admin/dashboard')}>Admin Panel</div>
          <div style={styles.sidebarItem} onClick={() => navigate('/profile')}>Profile</div>
          <div style={styles.sidebarItem} onClick={()  => navigate('/logout')}>Logout</div>
        </div>

        <div style={styles.content}>
          <div style={styles.heading}>Welcome to Your Dashboard</div>
          <div style={styles.cards}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Total Scholarships</div>
              <div style={styles.cardValue}>10</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>My Applications</div>
              <div style={styles.cardValue}>0</div>
            </div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Approved</div>
              <div style={styles.cardValue}>0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;