import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="container">
            <Link to="/" className="logo">
                <span className="logo-recipe">Recipe</span>
                <span className="logo-connect">Connect</span>
            </Link>
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/recipes" className="nav-link">Recipes</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
            </nav>
            <div className="auth-links">
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    </header>
);

export default Header;
