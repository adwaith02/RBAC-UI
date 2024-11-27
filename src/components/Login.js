import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Define valid credentials for each role
    const credentials = {
      admin: { email: 'admin@gmail.com', password: 'admin@123' },
      user: { email: 'user@gmail.com', password: 'user@123' },
      moderator: { email: 'moderator@gmail.com', password: 'moderator@123' },
    };

    // Determine role based on provided credentials
    let matchedRole = null;
    Object.entries(credentials).forEach(([role, creds]) => {
      if (email === creds.email && password === creds.password) {
        matchedRole = role;
      }
    });

    if (matchedRole) {
      setRole(matchedRole); // Set the role in the app state
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#4F8FC0' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '10px', backgroundColor: '#FFE3B3' }}>
        <h2 className='text-center mb-4' style={{ color: '#26648E' }}>Welcome to Role Based Access Control Login Page</h2>
        <h3 className="text-center mb-4" style={{ color: '#26648E' }}>RBAC Login</h3>
        
        <form onSubmit={handleLogin}>
          {/* Error message */}
          {error && <div className="alert alert-danger text-center mb-3" style={{ backgroundColor: '#53D2DC', color: '#fff' }}>{error}</div>}

          {/* Email field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: '#26648E' }}>Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={{ backgroundColor: '#26648E', borderColor: '#FFE3B3', color: '#fff' }}
            />
          </div>

          {/* Password field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: '#26648E' }}>Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ backgroundColor: '#26648E', borderColor: '#FFE3B3', color: '#fff' }}
            />
          </div>

          {/* Login button */}
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#53D2DC', color: '#fff', borderColor: '#53D2DC' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
