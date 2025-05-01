// src/pages/MyApplications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const { data } = await axios.get('http://localhost:5000/api/applications/my-applications',
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
      setApplications(data);

   // ⏳ Auto-redirect to dashboard after 5 seconds
   setTimeout(() => {
      navigate('/dashboard');
   }, 5000);

    } catch (error) {
      console.error(error);
      toast.error('Failed to load your applications');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <p className="text-gray-600 mb-4">Redirecting to dashboard in 5 seconds...</p>
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{application.scholarship_name}</h3>
            <p><strong>Status:</strong> {application.status}</p>
            <p><strong>Applied On:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;