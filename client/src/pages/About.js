import React from 'react';
import './About.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; 

const About = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="about-page">
      <div className="about-image">
        <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/09/healthy-food.jpg" alt="Food Spread" />
      </div>
      <div className="about-content">
        <h2>About Us</h2>
        <p><strong>We're Food Lovers, Just Like You</strong></p>
        <p>
          At RecipeConnect, we believe that food is more than just sustenance – it's a shared experience, a passion, and a form of art. Our mission is to create a vibrant online community where food enthusiasts can come together to discover, share, and enjoy delicious recipes from around the world.
        </p>
        <p>
          Whether you're a seasoned chef or a kitchen novice, there's a place for you here. Explore our diverse collection of recipes, from quick and easy weeknight meals to elaborate gourmet creations. Find inspiration for your next dinner party, or simply satisfy your cravings with comfort food classics.
        </p>
        {!isLoggedIn && ( 
          <>
            <p>Join the community today</p>
            <div className="button-wrapper">
              <button className="sign-up-button" onClick={handleSignUpClick}>SIGN UP</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default About;