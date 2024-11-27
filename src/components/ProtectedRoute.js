import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, requiredRole, children }) => {
  // If the user's role doesn't match the required role, redirect to login
  if (role !== requiredRole) {
    return <Navigate to="/" />;
  }
  return children; // Render the protected route if role matches
};

export default ProtectedRoute;
