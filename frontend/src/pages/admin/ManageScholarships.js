// src/pages/admin/ManageScholarships.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/scholarships', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setScholarships(data);
      } catch (error) {
        console.error('Error loading scholarships', error);
      }
    };
    fetchScholarships();
  }, []);

  const handleDeleteScholarship = async (scholarshipId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/scholarships/${scholarshipId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setScholarships(scholarships.filter(scholarship => scholarship.id !== scholarshipId));
    } catch (error) {
      console.error('Error deleting scholarship', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
      <div className="space-y-4">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{scholarship.name}</p>
              <p>{scholarship.description}</p>
            </div>
            <button
              onClick={() => handleDeleteScholarship(scholarship.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageScholarships;
