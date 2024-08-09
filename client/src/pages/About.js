import React from 'react';

import './About.css';
import { useNavigate } from 'react-router-dom';


const About = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/login');
  };

  return (
    <div>

      <section className="about-page">
        <div className="about-image">
          <img src="/assets/spread.png" alt="Food Spread" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>We're Food Lovers, Just Like You</p>
          <p>
            At RecipeConnect, we believe that food is more than just sustenance – it's a shared experience, a passion, and a form of art. Our mission is to create a vibrant online community where food enthusiasts can come together to discover, share, and enjoy delicious recipes from around the world.
          </p>
          <p>
            Whether you're a seasoned chef or a kitchen novice, there's a place for you here. Explore our diverse collection of recipes, from quick and easy weeknight meals to elaborate gourmet creations. Find inspiration for your next dinner party, or simply satisfy your cravings with comfort food classics.
          </p>
          <p>Join the community today</p>
          <button className="sign-up-button" onClick={handleSignUpClick}>SIGN UP</button>
        </div>
      </section>

    </div>
  );
};

export default About;
