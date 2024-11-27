import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoleManagement = () => {
  // Sample users with roles and permissions
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'user', permissions: ['Read'] },
    { id: 2, name: 'Jane Smith', role: 'moderator', permissions: ['Read', 'Write'] },
    { id: 3, name: 'Admin User', role: 'admin', permissions: ['Read', 'Write', 'Delete'] }
  ]);

  // State for roles and their associated permissions
  const [roles, setRoles] = useState([
    { name: 'user', permissions: ['Read'] },
    { name: 'moderator', permissions: ['Read', 'Write'] },
    { name: 'admin', permissions: ['Read', 'Write', 'Delete'] }
  ]);

  // States for creating/editing a role
  const [roleName, setRoleName] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [customPermission, setCustomPermission] = useState('');

  // States for role change functionality
  const [newRole, setNewRole] = useState('');
  const [newPermissions, setNewPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle role change and assign new permissions
  const handleRoleChange = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole, permissions: newPermissions } : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
    setNewRole('');
    setNewPermissions([]);
    toast.success('Role updated successfully!');
  };

  // Handle permissions selection for a new role
  const handlePermissionChange = (roleName) => {
    const role = roles.find(role => role.name === roleName);
    setNewPermissions(role ? role.permissions : []);
  };

  // Handle saving the new role
  const handleCreateRole = () => {
    if (roleName && rolePermissions.length > 0) {
      const newRoleObj = { name: roleName, permissions: rolePermissions };
      setRoles([...roles, newRoleObj]);
      setRoleName('');
      setRolePermissions([]);
      toast.success('Role created successfully!');
    } else {
      toast.error('Role name and permissions are required.');
    }
  };

  // Handle editing an existing role
  const handleEditRole = () => {
    if (selectedRole && roleName && rolePermissions.length > 0) {
      const updatedRoles = roles.map(role =>
        role.name === selectedRole.name
          ? { ...role, name: roleName, permissions: rolePermissions }
          : role
      );
      setRoles(updatedRoles);
      setSelectedRole(null);
      setRoleName('');
      setRolePermissions([]);
      toast.success('Role updated successfully!');
    } else {
      toast.error('Role name and permissions are required.');
    }
  };

  // Handle selecting a role for editing
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setRoleName(role.name);
    setRolePermissions(role.permissions);
  };

  // Handle adding a custom permission
  const handleAddCustomPermission = () => {
    if (customPermission && !rolePermissions.includes(customPermission)) {
      setRolePermissions([...rolePermissions, customPermission]);
      setCustomPermission('');
      toast.success('Custom permission added!');
    } else if (!customPermission) {
      toast.error('Permission cannot be empty.');
    } else {
      toast.error('Permission already exists.');
    }
  };

  // Handle deleting a role
  const handleDeleteRole = (roleName) => {
    // Check if the role is a default role, don't allow deletion
    if (['user', 'moderator', 'admin'].includes(roleName)) {
      toast.error('Cannot delete default roles (user, moderator, admin)');
      return;
    }

    // Delete the role if it's not a default role
    setRoles(roles.filter(role => role.name !== roleName));
    toast.success('Role deleted successfully!');
  };

  return (
    <div className="container mt-5">
      <h2>Role Management</h2>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User</th>
              <th>Current Role</th>
              <th>Current Permissions</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.permissions.join(', ')}</td>
                <td>
                  {selectedUser === user.id ? (
                    <div>
                      {/* Dropdown for selecting a new role */}
                      <select
                        value={newRole}
                        onChange={(e) => {
                          setNewRole(e.target.value);
                          handlePermissionChange(e.target.value); // Update permissions based on role
                        }}
                        className="form-select"
                      >
                        {roles.map((role, index) => (
                          <option key={index} value={role.name}>{role.name}</option>
                        ))}
                      </select>

                      {/* Display checkboxes for permissions based on the selected role */}
                      <div className="mt-3">
                        <h5>Permissions:</h5>
                        {newPermissions.length > 0 && newPermissions.map((permission, index) => (
                          <div key={index}>
                            <input
                              type="checkbox"
                              id={permission}
                              value={permission}
                              checked={newPermissions.includes(permission)}
                              onChange={() => {
                                const updatedPermissions = newPermissions.includes(permission)
                                  ? newPermissions.filter(p => p !== permission)
                                  : [...newPermissions, permission];
                                setNewPermissions(updatedPermissions);
                              }}
                            />
                            <label htmlFor={permission} className="ms-2">{permission}</label>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleRoleChange(user.id)}
                        className="btn btn-success mt-2"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedUser(user.id)}
                      className="btn btn-primary"
                    >
                      Change Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Definition Section */}
      <div className="mt-4">
        <h4>{selectedRole ? 'Edit Role' : 'Create New Role'}</h4>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Role Name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <h6>Permissions:</h6>
          <div>
            <input
              type="checkbox"
              id="read"
              value="Read"
              checked={rolePermissions.includes('Read')}
              onChange={() => {
                const updatedPermissions = rolePermissions.includes('Read')
                  ? rolePermissions.filter(p => p !== 'Read')
                  : [...rolePermissions, 'Read'];
                setRolePermissions(updatedPermissions);
              }}
            />
            <label htmlFor="read" className="ms-2">Read</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="write"
              value="Write"
              checked={rolePermissions.includes('Write')}
              onChange={() => {
                const updatedPermissions = rolePermissions.includes('Write')
                  ? rolePermissions.filter(p => p !== 'Write')
                  : [...rolePermissions, 'Write'];
                setRolePermissions(updatedPermissions);
              }}
            />
            <label htmlFor="write" className="ms-2">Write</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="delete"
              value="Delete"
              checked={rolePermissions.includes('Delete')}
              onChange={() => {
                const updatedPermissions = rolePermissions.includes('Delete')
                  ? rolePermissions.filter(p => p !== 'Delete')
                  : [...rolePermissions, 'Delete'];
                setRolePermissions(updatedPermissions);
              }}
            />
            <label htmlFor="delete" className="ms-2">Delete</label>
          </div>
        </div>

        {/* Custom Permission Input */}
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add Custom Permission"
            value={customPermission}
            onChange={(e) => setCustomPermission(e.target.value)}
          />
          <button
            onClick={handleAddCustomPermission}
            className="btn btn-secondary mt-2"
          >
            Add Permission
          </button>
        </div>

        <div className="mt-3">
          {selectedRole ? (
            <button onClick={handleEditRole} className="btn btn-primary">Save Changes</button>
          ) : (
            <button onClick={handleCreateRole} className="btn btn-success">Create Role</button>
          )}
        </div>
      </div>

      {/* List of Roles */}
      <div className="mt-4">
        <h4>Role List</h4>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index}>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(', ')}</td>
                  <td>
                    <button
                      onClick={() => handleSelectRole(role)}
                      className="btn btn-warning me-2 my-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.name)}
                      className="btn btn-danger"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default RoleManagement;
