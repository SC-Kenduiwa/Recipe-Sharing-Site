import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const socialLinks = [
        { href: "https://www.facebook.com", name: "Facebook", icon: faFacebook },
        { href: "https://www.instagram.com", name: "Instagram", icon: faInstagram },
        { href: "https://www.twitter.com", name: "Twitter", icon: faTwitter }
    ];

    const renderSocialLinks = () =>
        socialLinks.map(({ href, name, icon }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon} size="2x" />
            </a>
        ));

    return (
        <footer className="footer">
            <div className="container">
                <p>RecipeConnect aims to make cooking enjoyable...</p>
                <div className="footer-links">
                    <div className="top-links">
                        <h4>Top Links</h4>
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
