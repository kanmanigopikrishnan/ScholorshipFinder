import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">Scholarship Finder</div>
      {token ? (
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/scholarships" className="hover:underline">Scholarships</Link>
          <Link to="/my-applications" className="hover:underline">My Applications</Link>
          <Link to="/Recommendations" className="hover:underline">Recommendations</Link>
          <Link to="/admin/support-requests">Support Requests</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;