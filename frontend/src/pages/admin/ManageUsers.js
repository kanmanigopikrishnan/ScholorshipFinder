// src/pages/admin/ManageUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(data);
      } catch (error) {
        console.error('Error loading users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded flex justify-between">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p>{user.email}</p>
            </div>
            <button
              onClick={() => handleDeleteUser(user.id)}
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

export default ManageUsers;
