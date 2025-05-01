import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProviderLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/provider/login', { email, password });
            localStorage.setItem('providerToken', response.data.token); // Store JWT in localStorage
            history.push('/provider/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Provider Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <p>Don't have an account? <a href="/provider/register">Register</a></p>
        </div>
    );
};

const styles = {
    container: {
        width: '300px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
};

export default ProviderLogin;
