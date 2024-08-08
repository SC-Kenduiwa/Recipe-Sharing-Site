import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>RecipeConnect</h2>
          <p>Your go-to platform for the best recipes.</p>
        </div>
        <div className="footer-center">
          <p>&copy; 2024 RecipeConnect. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="home">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="#recipes">Our Recipes</a></li>
          <li><a href="#profile">Profile</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
