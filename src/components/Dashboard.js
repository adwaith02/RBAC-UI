import React, { useState, useEffect } from 'react';

const Dashboard = ({ role }) => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingRequests: 0,
  });

  // Simulate fetching user statistics (replace with actual API call)
  useEffect(() => {
    if (role === 'admin') {
      // Example data for admin
      setUserStats({
        totalUsers: 120,
        activeUsers: 100,
        pendingRequests: 5,
      });
    }
  }, [role]);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome, {role}!</p>

      {/* Admin Dashboard Features */}
      {role === 'admin' && (
        <>
          <div className="row mt-4">
            {/* Total Users */}
            <div className="col-12 col-md-4 mb-4">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{userStats.totalUsers}</p>
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div className="col-12 col-md-4 mb-4">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">Active Users</h5>
                  <p className="card-text">{userStats.activeUsers}</p>
                </div>
              </div>
            </div>

            {/* Pending Requests */}
            <div className="col-12 col-md-4 mb-4">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Pending Requests</h5>
                  <p className="card-text">{userStats.pendingRequests}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4>Admin Quick Links</h4>
            <ul>
              <li>User Management</li>
              <li>Role Management</li>
              <li>Permission Management</li>
              <li>Access Request System</li>
            </ul>
          </div>
        </>
      )}

      {/* Moderator Dashboard Features */}
      {role === 'moderator' && (
        <>
          <div className="mt-4">
            <p>Review and manage pending access requests from users.</p>
            <ul>
              <li>Access Request System</li>
              <li>Pending Access Requests</li>
            </ul>
          </div>
        </>
      )}

      {/* User Dashboard Features */}
      {role === 'user' && (
        <>
          <div className="mt-4">
            <p>View and manage your access requests.</p>
            <ul>
              <li>Access Request System</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
