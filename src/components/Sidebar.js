import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaShieldAlt, FaCogs, FaLock, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import { confirmAlert } from 'react-confirm-alert'; // Importing the react-confirm-alert function
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importing the CSS for the confirmation dialog

const Sidebar = ({ role }) => {
  const location = useLocation(); // Hook to get current location

  // Function to determine if the current link is active
  const isActive = (path) => location.pathname === path ? 'bg-primary text-white' : '';

  // Function to handle logout with confirmation
  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            window.location.href = '/'; // Redirect to home page on confirmation
          },
        },
        {
          label: 'No',
          onClick: () => {}, // Do nothing on cancel
        },
      ],
    });
  };

  return (
    <div
      className="sidebar d-flex flex-column p-4 bg-dark text-white"
      style={{
        height: '100vh',
        width: '250px',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {/* Sidebar Header with logo and role */}
      <div className="text-center mb-4">
        <h4>RBAC Sidebar</h4>
        <p className="text-muted">{`Role: ${role}`}</p>
      </div>

      {/* Sidebar Navigation Links */}
      <div className="flex-grow-1">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/dashboard')}`}
        >
          <FaHome className="me-2" />
          <span>Dashboard</span>
        </Link>

        {/* Admin links */}
        {role === 'admin' && (
          <>
            <Link
              to="/user-management"
              className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/user-management')}`}
            >
              <FaUsers className="me-2" />
              <span>User Management</span>
            </Link>
            <Link
              to="/role-management"
              className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/role-management')}`}
            >
              <FaShieldAlt className="me-2" />
              <span>Role Management</span>
            </Link>
            <Link
              to="/permission-management"
              className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/permission-management')}`}
            >
              <FaCogs className="me-2" />
              <span>Permission Management</span>
            </Link>
            <Link
              to="/access-request-system"
              className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/access-request-system')}`}
            >
              <FaLock className="me-2" />
              <span>Access Request System</span>
            </Link>
          </>
        )}

        {/* User links */}
        {role === 'user' && (
          <Link
            to="/access-request-system"
            className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/access-request-system')}`}
          >
            <FaLock className="me-2" />
            <span>Access Request System</span>
          </Link>
        )}

        {/* Moderator links */}
        {role === 'moderator' && (
          <>
            <Link
              to="/access-request-system"
              className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/access-request-system')}`}
            >
              <FaLock className="me-2" />
              <span>Access Request System</span>
            </Link>
            <Link
              to="/permission-management"
              className={`sidebar-link d-flex align-items-center py-2 px-3 mb-2 text-white text-decoration-none ${isActive('/permission-management')}`}
            >
              <FaCogs className="me-2" />
              <span>Permission Management</span>
            </Link>
          </>
        )}
      </div>

      {/* Log out Button */}
      <div className="mt-auto">
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-between border-0 logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
