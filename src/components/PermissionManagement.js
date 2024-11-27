import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PermissionManagement = () => {
  // State for permissions
  const [permissions, setPermissions] = useState([
    { action: 'View Dashboard', roles: ['admin', 'moderator', 'user'] },
    { action: 'Manage Users', roles: ['admin'] },
    { action: 'Manage Roles', roles: ['admin'] },
    { action: 'Access Request System', roles: ['admin', 'user'] }
  ]);

  // Hardcoded roles, can be fetched dynamically from a server if needed
  const roles = ['admin', 'user', 'moderator'];

  // Toggle permission for a given action and role
  const togglePermission = (action, role) => {
    setPermissions(prevPermissions =>
      prevPermissions.map(permission =>
        permission.action === action
          ? {
              ...permission,
              roles: permission.roles.includes(role)
                ? permission.roles.filter(r => r !== role)
                : [...permission.roles, role]
            }
          : permission
      )
    );
    toast.success(`Permission for ${role} on ${action} updated successfully!`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Permission Management</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Action</th>
              <th>Roles with Permission</th>
              <th>Change Permission</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(permission => (
              <tr key={permission.action}>
                <td>{permission.action}</td>
                <td>
                  {permission.roles.join(', ')}
                </td>
                <td>
                  {roles.map(role => (
                    <div key={role} className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        checked={permission.roles.includes(role)}
                        onChange={() => togglePermission(permission.action, role)}
                        className="form-check-input"
                      />
                      <label className="form-check-label">{role}</label>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default PermissionManagement;
