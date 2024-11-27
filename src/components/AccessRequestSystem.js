import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccessRequestSystem = ({ role }) => {
  // Sample data for access requests
  const [accessRequests, setAccessRequests] = useState([
    { id: 1, user: 'John Doe', role: 'user', status: 'Pending' },
    { id: 2, user: 'Jane Smith', role: 'moderator', status: 'Approved' },
    { id: 3, user: 'Admin User', role: 'admin', status: 'Rejected' }
  ]);

  const [newRequest, setNewRequest] = useState({ user: '', role: '', status: 'Pending' });

  // Handle submitting a new access request
  const handleRequestSubmit = () => {
    if (newRequest.user && newRequest.role) {
      const updatedRequests = [...accessRequests, { ...newRequest, id: accessRequests.length + 1 }];
      setAccessRequests(updatedRequests);
      setNewRequest({ user: '', role: '', status: 'Pending' });
      toast.success('Access request submitted successfully!');
    } else {
      toast.error('User and role are required.');
    }
  };

  // Handle updating the status of an access request
  const handleStatusChange = (id, status) => {
    const updatedRequests = accessRequests.map(request =>
      request.id === id ? { ...request, status } : request
    );
    setAccessRequests(updatedRequests);
    toast.success(`Request ${status} successfully!`);
  };

  return (
    <div className="container mt-5">
      <h2>Access Request System</h2>

      {/* Access Request Form for Users */}
      {role === 'user' && (
        <div className="row mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <h4>Create New Request</h4>
            <div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="User Name"
                value={newRequest.user}
                onChange={(e) => setNewRequest({ ...newRequest, user: e.target.value })}
              />
            </div>
            <div>
              <select
                className="form-select mb-2"
                value={newRequest.role}
                onChange={(e) => setNewRequest({ ...newRequest, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button onClick={handleRequestSubmit} className="btn btn-primary w-100">
              Submit Request
            </button>
          </div>
        </div>
      )}

      {/* Access Requests Table for Admins and Moderators */}
      {(role === 'admin' || role === 'moderator') && (
        <>
          <h4>Current Access Requests</h4>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accessRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.user}</td>
                    <td>{request.role}</td>
                    <td>{request.status}</td>
                    <td>
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(request.id, 'Approved')}
                            className="btn btn-success me-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(request.id, 'Rejected')}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default AccessRequestSystem;
