import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './mockApi'; // Import mock API functions
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import { toast } from 'react-toastify'; // Import react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', status: 'Active' });
  const [isEditing, setIsEditing] = useState(null);
  const [searchRole, setSearchRole] = useState(''); // State for search functionality

  useEffect(() => {
    // Fetch users from the mock API when component mounts
    getUsers().then(setUsers);
  }, []);

  const handleAddUser = () => {
    addUser(newUser)
      .then(user => {
        setUsers([...users, user]); // Update the user list with the new user
        setNewUser({ name: '', email: '', role: 'user', status: 'Active' }); // Reset form fields
        toast.success('User added successfully!'); // Show success toast
      })
      .catch(err => {
        toast.error('Failed to add user!');
        console.error(err);
      });
  };

  const handleUpdateUser = (id, updatedUser) => {
    updateUser(id, updatedUser)
      .then(updated => {
        setUsers(users.map(user => (user.id === id ? updated : user))); // Update the user list with the updated user
        setIsEditing(null); // Exit editing mode
        toast.success('User updated successfully!'); // Show success toast
      })
      .catch(err => {
        toast.error('Failed to update user!');
        console.error(err);
      });
  };

  const handleDeleteUser = (id, role) => {
    if (role === 'admin') {
      toast.error('This option is Limited to The Prime Admin'); // Error message for admin role
      return;
    }

    deleteUser(id)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // Remove the deleted user from the list
        toast.success('User deleted successfully!'); // Show success toast
      })
      .catch(err => {
        toast.error('Failed to delete user!');
        console.error(err);
      });
  };

  const handleToggleStatus = (id, currentStatus) => {
    const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    updateUser(id, { status: updatedStatus })
      .then(updated => {
        setUsers(users.map(user => (user.id === id ? updated : user))); // Update the user's status
      })
      .catch(err => {
        toast.error('Failed to update status!');
        console.error(err);
      });
  };

  const handleEditClick = (user) => {
    setIsEditing(user.id);
    setNewUser({ ...user });
  };

  // Filter users based on the selected role
  const filteredUsers = searchRole
    ? users.filter(user => user.role.toLowerCase() === searchRole.toLowerCase())
    : users;

  return (
    <div className="container mt-5">
      <h2>User Management</h2>

      {/* Role Search */}
      <div className="mb-4">
        <h5>Search by Role</h5>
        <select
          className="form-select w-25 mb-3"
          value={searchRole}
          onChange={(e) => setSearchRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Add/Edit User Form */}
      <div className="mb-4">
        <h4>{isEditing ? 'Edit User' : 'Add New User'}</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={isEditing ? () => handleUpdateUser(newUser.id, newUser) : handleAddUser}
          >
            {isEditing ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>

      {/* User Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className={`btn btn-${user.status === 'Active' ? 'success' : 'secondary'} my-2`}
                  onClick={() => handleToggleStatus(user.id, user.status)}
                >
                  {user.status}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning me-2 my-2"
                  onClick={() => handleEditClick(user)}
                >
                  <FaEdit />Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id, user.role)}
                >
                  <FaTrash />Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
