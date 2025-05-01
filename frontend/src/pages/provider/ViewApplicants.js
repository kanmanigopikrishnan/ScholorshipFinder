import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewApplicants = () => {
    const { scholarshipId } = useParams();  // To get the scholarship ID from the URL
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplicants = async () => {
            const token = localStorage.getItem('providerToken');
            try {
                const response = await axios.get(`/api/provider/applications/${scholarshipId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setApplicants(response.data);
            } catch (err) {
                setError('Failed to fetch applicants.');
            }
        };

        fetchApplicants();
    }, [scholarshipId]);  // Re-fetch when the scholarshipId changes

    return (
        <div style={styles.container}>
            <h2>Applicants for Scholarship</h2>
            {error && <p style={styles.error}>{error}</p>}
            <ul>
                {applicants.length === 0 ? (
                    <p>No applicants yet.</p>
                ) : (
                    applicants.map((applicant) => (
                        <li key={applicant.id} style={styles.applicant}>
                            <h4>{applicant.name}</h4>
                            <p>Email: {applicant.email}</p>
                            <p>Application Date: {new Date(applicant.created_at).toLocaleDateString()}</p>
                            <p>Application Status: {applicant.status}</p>
                        </li>
                    ))
                )}
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
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
    applicant: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    },
};

export default ViewApplicants;
