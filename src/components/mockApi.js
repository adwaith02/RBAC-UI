// Mock user data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'Active' },
  { id: 2, name: 'Bill Warren', email: 'bill@example.com', role: 'user', status: 'Inactive' },
  { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', status: 'Active' },
  { id: 4, name: 'Sam Wilson', email: 'sam@example.com', role: 'admin', status: 'Active' }
];

// Mock roles data
let roles = [
  { id: 1, name: 'user' },
  { id: 2, name: 'moderator' },
  { id: 3, name: 'admin' }
];

// Simulate API Call to Get Users
export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 1000); // Simulate a 1 second delay
  });
};

// Simulate API Call to Add a New User
export const addUser = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user.name && user.email && user.role) {
        const newUser = { id: users.length + 1, ...user, status: user.status || 'Inactive' }; // Default status to 'Inactive'
        users.push(newUser);
        resolve(newUser);
      } else {
        reject('All fields are required');
      }
    }, 1000); // Simulate a 1 second delay
  });
};

// Simulate API Call to Update a User
export const updateUser = (id, updatedUser) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        reject('User not found');
      } else {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        resolve(users[userIndex]);
      }
    }, 1000); // Simulate a 1 second delay
  });
};

// Simulate API Call to Delete a User
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        reject('User not found');
      } else {
        users = users.filter(user => user.id !== id);
        resolve('User deleted');
      }
    }, 1000); // Simulate a 1 second delay
  });
};

// Simulate API Call to Get Roles
export const getRoles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(roles);
    }, 1000); // Simulate a 1 second delay
  });
};

// Simulate API Call to Add a New Role
export const addRole = (role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (role.name) {
        const newRole = { id: roles.length + 1, ...role };
        roles.push(newRole);
        resolve(newRole);
      } else {
        reject('Role name is required');
      }
    }, 1000); // Simulate a 1 second delay
  });
};
