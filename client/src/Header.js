import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="container">
            <Link to="/" className="logo">RecipeConnect</Link>
            <nav className="nav">
                <Link to="/about">About Us</Link>
                <Link to="/recipes">Recipes</Link>
                <Link to="/profile">Profile</Link>
            </nav>
            <div className="auth-links">
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    </header>
);

export default Header;
