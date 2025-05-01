import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProviderDashboard = () => {
    const [scholarships, setScholarships] = useState([]);
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchScholarships = async () => {
            const token = localStorage.getItem('providerToken');
            try {
                const response = await axios.get('/api/provider/scholarships', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setScholarships(response.data);
            } catch (err) {
                setError('Failed to fetch scholarships.');
            }
        };

        fetchScholarships();
    }, []);

    const handlePostScholarship = () => {
        history.push('/provider/post-scholarship');
    };

    const handleViewApplicants = (scholarshipId) => {
        history.push(`/provider/applicants/${scholarshipId}`);
    };

    return (
        <div style={styles.container}>
            <h2>Provider Dashboard</h2>
            {error && <p style={styles.error}>{error}</p>}
            <button onClick={handlePostScholarship} style={styles.button}>Post New Scholarship</button>
            <h3>Your Scholarships</h3>
            <ul>
                {scholarships.map((scholarship) => (
                    <li key={scholarship.id}>
                        <h4>{scholarship.title}</h4>
                        <p>{scholarship.description}</p>
                        <p>Deadline: {scholarship.deadline}</p>
                        <button onClick={() => handleViewApplicants(scholarship.id)} style={styles.button}>View Applicants</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        width: '80%',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
};

export default ProviderDashboard;
