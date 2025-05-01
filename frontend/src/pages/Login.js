import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || (isSignup && (!name || !mobile))) {
      alert('Please fill all required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }

    if (isSignup) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(mobile)) {
        alert('Enter a valid 10-digit mobile number.');
        return false;
      }
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password, mobile });
      alert('Account created! Please login.');
      setIsSignup(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url('/images/login-bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  box: {
    backgroundColor:'rgba(255, 255, 255, 0)', 
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    color: '#fff',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#000',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
  },
  button: {
    backgroundColor: loading ? '#999' : 'purple',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    marginTop: '10px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
  },
  switch: {
    textAlign: 'center',
    fontSize: '14px',
    marginTop: '15px',
  },
  linkButton: {
    color: 'white',
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: 0,
    fontSize: '14px',
  },
  spinner: {
    textAlign: 'center',
    marginTop: '10px',
    fontStyle: 'italic',
    fontSize: '14px',
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.heading}>{isSignup ? 'Create Account' : 'Welcome User!'}</div>
        {isSignup && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
          </div>
        )}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        </div>
        {isSignup && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} style={styles.input} />
          </div>
        )}
        <button
          onClick={isSignup ? handleSignup : handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
        {loading && <div style={styles.spinner}>Please wait...</div>}
        <div style={styles.switch}>
          {isSignup ? (
            <>Already have an account?{' '}
              <button onClick={() => setIsSignup(false)} style={styles.linkButton}>Login</button>
            </>
          ) : (
            <>New user?{' '}
              <button onClick={() => setIsSignup(true)} style={styles.linkButton}>Create a new account</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
