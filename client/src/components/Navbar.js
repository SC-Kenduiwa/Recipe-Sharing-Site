import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from './Logo';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
        <li><Link to="/recipes" className={location.pathname === '/recipes' ? 'active' : ''}>Our Recipes</Link></li>
        {isLoggedIn && <li><Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link></li>}
      </ul>
      <div className={`navbar-buttons ${isMobile ? (menuOpen ? 'show' : 'hide') : ''}`}>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className={`login-btn ${location.pathname === '/login' ? 'active' : ''}`}>Log In</Link>
            <Link to="/signup" className={`signup-btn ${location.pathname === '/signup' ? 'active' : ''}`}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;