import React from 'react';
import FeaturedRecipes from '../components/FeaturedRecipes';
import TopRecipe from '../components/TopRecipe';

import './Home.css'; 
const Home = () => {
  return (
    <div className="home-page">  
      <FeaturedRecipes />
      <TopRecipe />
    </div>
  );
};

export default Home;
