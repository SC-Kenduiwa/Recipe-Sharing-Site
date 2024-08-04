import React from 'react';
import featuredImage from '../assets/images/featured-image.jpg';
import './About.css';

const About = () => (
    <>
        <div className="about-container">
            <img src={featuredImage} alt="Featured" className="featured-image" />
            <div className="about-content">
                <h1>About Us</h1>
                <p>We're Food Lovers, Just Like You</p>
                <p>At RecipeConnect, we believe that food is more than just sustenance – it's a shared experience, a passion, and a form of art. Our mission is to create a vibrant online community where food enthusiasts can come together to discover, share, and enjoy delicious recipes from around the world.</p>
                <p>Whether you're a seasoned chef or a kitchen novice, there's a place for you here. Explore our diverse collection of recipes, from quick and easy weeknight meals to elaborate gourmet creations. Find inspiration for your next dinner party, or simply satisfy your cravings with comfort food classics.</p>
                <p>Join the community today</p>
                <button className="signup-button">Sign up</button>
            </div>
        </div>
    </>
);

export default About;
