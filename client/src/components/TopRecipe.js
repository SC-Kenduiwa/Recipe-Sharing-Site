import React from 'react';
import './TopRecipe.css';

const TopRecipe = () => {
  const topRecipe = {
    image: require('../assets/images/top-recipe.jpg'),
    title: 'Home-Made Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with a crispy edge and chewy center.'
  };

  return (
    <section className="top-recipe">
      <h2>Top Recipe</h2>
      <div className="recipe-details">
        <img src="/assets/pic1.jpg" alt="Top Recipe" className="recipe-image" />
        <div className="recipe-info">
          <h3>Loaded Nachos and Creamy Chicken</h3>
          <p>Indulge in a delightful spread featuring loaded nachos topped with seasoned ground meat, melted cheese, and fresh salsa, served with a side of creamy guacamole and sour cream. Accompanying this is a creamy chicken dish garnished with cherry tomatoes and fresh herbs, offering a rich and savory flavor that's perfect for any gathering.</p>
        </div>
      </div>
    </section>
  );
};

export default TopRecipe;
