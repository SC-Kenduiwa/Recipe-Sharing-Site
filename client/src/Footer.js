import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>RecipeConnect aims to make cooking enjoyable...</p>
            <div className="footer-links">
                <div className="top-links">
                    <Link to="/">Home</Link>
                    <Link to="/recipes">Recipes</Link>
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
