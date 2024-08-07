import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/recipes">Our Recipes</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;