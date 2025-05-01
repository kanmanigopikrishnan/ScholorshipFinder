import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      backgroundImage: "url('/images/home-bg.jpg')", // Ensure image is placed correctly in public/images
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      padding: '20px',
    },
    box: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker background for contrast
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '450px',
      color: '#fff',
      marginRight: '40px',
    },
    heading: {
      fontSize: '2.8rem',
      color: '#ffffff',
      marginBottom: '20px',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
    },
    paragraph: {
      fontSize: '1.3rem',
      color: '#e0e0e0',
      marginBottom: '30px',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
    },
    link: {
      textDecoration: 'none',
      backgroundColor: '#9c27b0',
      color: '#fff',
      padding: '12px 28px',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      display: 'inline-block',
    },
    linkHover: {
      backgroundColor: '#7b1fa2',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Welcome to the Scholarship Finder</h1>
        <p style={styles.paragraph}>
          Find and apply for scholarships that fit your profile.
        </p>
        <Link
          to="/login"
          style={styles.link}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
        >
          Login to get started
        </Link>
      </div>
    </div>
  );
};

export default HomePage;