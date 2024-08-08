import React from 'react';

import { Link } from 'react-router-dom';


import './Navbar.css';
import Logo from './Logo';

const Navbar = () => {
<<<<<<< HEAD
  // const navigate = useNavigate();
=======
  
>>>>>>> Aden

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
<<<<<<< HEAD
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/recipes">Our Recipes</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="navbar-buttons">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
=======

        <li><a href="#about">About Us</a></li>
        <li><a href="#recipes">Our Recipes</a></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="navbar-buttons">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>

>>>>>>> Aden
      </div>
    </nav>
  );
};

export default Navbar;