import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>
      <p style={styles.text}>
        ScholarPathwayHub is a platform dedicated to helping students discover and apply for scholarships with ease.
        We aim to make higher education accessible and affordable for everyone.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#E6E6FA', // Mild lavender
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

export default About;