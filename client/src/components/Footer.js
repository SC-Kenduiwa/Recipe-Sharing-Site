import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const socialLinks = [
        { href: "https://www.facebook.com", name: "Facebook" },
        { href: "https://www.instagram.com", name: "Instagram" },
        { href: "https://www.twitter.com", name: "Twitter" }
    ];

    const renderSocialLinks = () =>
        socialLinks.map(({ href, name }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name}</a>
        ));

    return (
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
                        {renderSocialLinks()}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
