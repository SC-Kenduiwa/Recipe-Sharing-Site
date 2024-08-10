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
          <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg" alt="Delicious food" />
          <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/04/strawberry-milk-splash.jpg" alt="Delicious food" />
        </div>
      </section>
      <FeaturedRecipes />
      <TopRecipe />
    </div>
  );
};

export default Home;