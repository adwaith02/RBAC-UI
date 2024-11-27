Role-Based Access Control (RBAC) UI Project

This project demonstrates a Role-Based Access Control (RBAC) system where users can be assigned different roles such as Admin, Moderator, and User. The system allows users to manage permissions, roles, and access to various features based on their roles.

Project Overview

The RBAC UI Project consists of a set of frontend-only components built with React. The system implements a login page where users with different roles can authenticate and access different sections of the application based on their permissions. The project uses state management and conditional rendering to restrict access to features.

Features:
    Role Management: Admin users can manage the roles of other users.
    Permission Management: Admins can assign specific permissions to roles (like viewing the dashboard, managing users, etc.).
    User Management: Admin users can manage user details and their permissions.
    Access Request System: Both admin and user roles can request access to restricted features.
    Dashboard: A personalized dashboard for each user based on their role.



Setup Instructions

Prerequisites

To run the project locally, make sure you have the following installed:

Node.js (version 14.x or above)
npm to manage dependencies
React Router DOM for routing
React Toastify for notifications
React Confirm Alert for logout confirmation dialogs


Login Credentials

Use the following credentials to log into the system:

Admin:
    Email: admin@gmail.com
    Password: admin@123

User:
    Email: user@gmail.com
    Password: admin@123

Moderator:
    Email: moderator@gmail.com
    Password: moderator@123

Once logged in, the available components and features will depend on the assigned role.

---

Components

1. Login.js
The login page is the first point of entry where users can authenticate. Upon successful login, users are redirected to the dashboard, and their role-based access is determined.

2. Dashboard.js
The main dashboard page is displayed after login. It contains an overview of the system and is personalized for each user based on their role.

3. Sidebar.js
The sidebar contains navigation links that change based on the user's role. For example:
- Admins have access to User Management, Role Management, Permission Management, and Access Request System.
- Users have limited access, with only the Access Request System available.
- Moderators have access to Permission Management and Access Request System.

The sidebar also includes a Logout button, which triggers a confirmation dialog before logging out the user.

4. RoleManagement.js
This component allows admin users to manage roles for different users. Admins can assign or remove roles for users based on permissions.

5. PermissionManagement.js
In this component, admins can manage permissions for each role. Permissions like "View Dashboard", "Manage Users", and "Manage Roles" can be toggled for each role (Admin, User, Moderator).

6. UserManagement.js
This component allows admin users to manage user data and adjust their permissions as needed.

7. AccessRequestSystem.js
This component handles access requests. Admins can approve or deny access requests for certain features, and users can submit requests based on their role.

8. ProtectedRoute.js
This component wraps around protected routes to ensure that users are only able to access pages they're authorized to view based on their roles.

9. MockApi.js
This file handles mock API calls and serves as the backend for this frontend-only project. It simulates fetching user data, permissions, roles, etc.

---

Dependencies

react-toastify: Used for displaying toast notifications.
react-router-dom: Used for managing routes and page navigation.
react-confirm-alert: Provides confirmation dialogs, specifically used for the logout confirmation.

---

Project Structure

```
/rbac-ui-project
├── /public
│   └── index.html
├── /src
│   ├── components
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Sidebar.js
│   │   ├── RoleManagement.js
│   │   ├── PermissionManagement.js
│   │   ├── UserManagement.js
│   │   ├── AccessRequestSystem.js
│   │   └── ProtectedRoute.js
│   │   └── mockApi.js
│   ├── Style.css
│   ├── App.js
│   └── index.js
└── /node_modules
└── package.json
└── README.md
```

---

Future Enhancements

Backend Integration: Currently, the project is frontend-only. A backend API can be added to store user data, roles, and permissions dynamically.
Persistent User Sessions: Implement session management (e.g., JWT tokens) to maintain user authentication status even after page reloads.
Testing: Add unit tests using tools like Jest or React Testing Library to ensure the functionality of components.
Accessibility: Improve accessibility by adding ARIA labels and improving keyboard navigation.

---

This README provides a comprehensive overview of the project, including setup instructions, features, and the structure of the RBAC system. Let me know if you'd like to modify any part or add additional information!
