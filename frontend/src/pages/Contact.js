import React from 'react';

const Contact = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.text}>
        If you have any questions, feel free to reach out to us at: <br />
        <strong>Email:</strong> support@scholarpathwayhub.com <br />
        <strong>Phone:</strong> +123 456 7890
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

export default Contact;