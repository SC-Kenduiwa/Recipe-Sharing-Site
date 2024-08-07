import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#recipes">Our Recipes</a></li>
        <li><a href="#profile">Profile</a></li>
      </ul>
      <div className="navbar-buttons">
        <Link to="#login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="#signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
