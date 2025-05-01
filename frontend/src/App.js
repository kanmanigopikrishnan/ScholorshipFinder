// /frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import ScholarshipList from './pages/userScholarshipList';
import ScholarshipApplicationForm from './pages/ScholarshipApplicationForm';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageScholarships from './pages/admin/ManageScholarships';
import ManageApplications from './pages/admin/ManageApplications';
import ProviderDashboard from './pages/providers/ProviderDashboard';
import ViewApplicants from './pages/providers/ViewApplicants';

import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App () {
    return (
        <Router>
          <Routes>
          <Route path='/' element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>}/>
          <Route path="/scholarships" element={<PrivateRoute><ScholarshipList /></PrivateRoute>}/>
          <Route path="/apply/:scholarshipId" element={<ScholarshipApplicationForm/>} />
          <Route path="/my-applications" element={<PrivateRoute><MyApplications /></PrivateRoute>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-scholarships" element={<ManageScholarships />} />
          <Route path="/admin/manage-applications" element={<ManageApplications />} />
          <Route path="/provider/dashboard" exact component={ProviderDashboard} />
          <Route path="/provider/applicants/:scholarshipId" component={ViewApplicants} />
          <Route path="/Navbar" element={<Navbar/>} />
          </Routes>
        </Router>
    );
};

export default App;