import React from 'react';
import './TopRecipe.css';

const TopRecipe = () => {
  const topRecipe = {
    image: require('../assets/top-recipe.jpg'),
    title: 'Home-Made Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with a crispy edge and chewy center.'
  };

  return (
    <section className="top-recipe">
      <h2>Top Recipe</h2>
      <div className="recipe-highlight">
        <img src={topRecipe.image} alt={topRecipe.title} />
        <div className="recipe-details">
          <h3>{topRecipe.title}</h3>
          <p>{topRecipe.description}</p>
          <button>View Recipe</button>
        </div>
      </div>
    </section>
  );
};

export default TopRecipe;
