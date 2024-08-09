import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <h2>RecipeConnect</h2>
          <p>Your go-to platform for the best recipes.</p>
        </div>

        <div className="footer-section">
          
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="/contact">Contact Form</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section social-media">
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
      <div className="footer-bottom">
        <p>&copy; 2024 RecipeConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
