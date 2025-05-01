// src/pages/admin/ManageApplications.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/applications', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setApplications(data);
      } catch (error) {
        console.error('Error loading applications', error);
      }
    };
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/applications/${applicationId}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setApplications(applications.map(application => 
        application.id === applicationId ? { ...application, status } : application
      ));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{application.scholarship_name}</p>
              <p>Status: {application.status}</p>
              <button
                onClick={() => handleUpdateStatus(application.id, 'Approved')}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateStatus(application.id, 'Rejected')}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageApplications;
