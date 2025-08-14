import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // check if logged in
  if (!token) return <Navigate to="/login" replace />; // redirect to login if not

  return children;
};

export default ProtectedRoute;
