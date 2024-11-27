import './App.css';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';
import AccessRequestSystem from './components/AccessRequestSystem';
import Sidebar from './components/Sidebar'; // Import Sidebar component

function App() {
  const [role, setRole] = useState(null); // Store the user's role

  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar is only rendered if the user is logged in */}
        {role && <Sidebar role={role} />}

        {/* Main Content */}
        <div className="main-content" style={{ marginLeft: role ? '250px' : '0', width: '100%' }}>
          {/* Toast notifications container */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Routes>
            {/* Login Route */}
            <Route path="/" element={<Login setRole={setRole} />} />

            {/* Admin Routes */}
            {role === 'admin' && (
              <>
                <Route path="/dashboard" element={<Dashboard role={role} setRole={setRole} />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/role-management" element={<RoleManagement />} />
                <Route path="/permission-management" element={<PermissionManagement />} />
                <Route path="/access-request-system" element={<AccessRequestSystem role={role} />} />
              </>
            )}

            {/* User Routes */}
            {role === 'user' && (
              <>
                <Route path="/dashboard" element={<Dashboard role={role} setRole={setRole} />} />
                <Route path="/access-request-system" element={<AccessRequestSystem role={role} />} />
              </>
            )}

            {/* Moderator Routes */}
            {role === 'moderator' && (
              <>
                <Route path="/dashboard" element={<Dashboard role={role} setRole={setRole} />} />
                <Route path="/permission-management" element={<PermissionManagement />} />
                <Route path="/access-request-system" element={<AccessRequestSystem role={role} />} />
              </>
            )}

            {/* Redirect to Login if role is not defined */}
            {role === null && <Route path="*" element={<Navigate to="/" />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
