// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../components/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/login', { username, password });
      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      setupTokenRefresh(refresh_token);
      setIsLoggedIn(true);
      navigate('/recipes');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const setupTokenRefresh = (refreshToken) => {
    // Your existing token refresh logic
  };

  return (
    <div className="login-container">
      <div className="image-section"></div>
      <div className="login-section">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;