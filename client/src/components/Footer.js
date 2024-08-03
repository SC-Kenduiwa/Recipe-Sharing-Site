import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported from react-router-dom
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
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
