import React from 'react';
import './Home.css';
import FeaturedRecipes from '../components/FeaturedRecipes';
import TopRecipe from '../components/TopRecipe';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food & Recipes For Your Loved ones</h1>
          <p>Explore our wide range of recipes that will make your meals special.</p>
          <button className="hero-button">Get Started</button>
        </div>
        <div className="hero-images">
          <img src="client/src/assets/image1.jpg" alt="Delicious food" />
          <img src="client/src/assets/image2.jpg" alt="Delicious food" />
        </div>
      </section>
      <FeaturedRecipes />
      <TopRecipe />
    </div>
  );
};

export default Home;
