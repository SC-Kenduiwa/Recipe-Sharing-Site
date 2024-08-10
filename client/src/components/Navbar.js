import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from './Logo';
import { useAuth } from './AuthContext';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo />
      </div>
      {isMobile ? (
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : null}
      <ul className={`navbar-links ${isMobile ? (menuOpen ? 'show' : 'hide') : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/recipes">Our Recipes</Link></li>
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
      </ul>
      <div className={`navbar-buttons ${isMobile ? (menuOpen ? 'show' : 'hide') : ''}`}>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="login-btn">Log In</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
