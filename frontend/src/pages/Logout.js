// src/pages/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");  // remove the JWT token
    navigate("/login");  // redirect to login page
  }, [navigate]);

  return <h3>Logging out...</h3>;
};

export default Logout;