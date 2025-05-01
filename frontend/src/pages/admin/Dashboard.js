// src/pages/admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1,
    totalScholarships: 10,
    totalApplications: 1,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Total Scholarships</h3>
          <p>{stats.totalScholarships}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Total Applications</h3>
          <p>{stats.totalApplications}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <ul>
          <li><Link to="/admin/manage-users">Manage Users</Link></li>
          <li><Link to="/admin/manage-scholarships">Manage Scholarships</Link></li>
          <li><Link to="/admin/manage-applications">Manage Applications</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
