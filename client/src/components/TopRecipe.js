import React from 'react';
import './TopRecipe.css';

const TopRecipe = () => {
<<<<<<< HEAD
=======
  const topRecipe = {
    image: require('../assets/images/top-recipe.jpg'),
    title: 'Home-Made Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies with a crispy edge and chewy center.'
  };

>>>>>>> Aden
  return (
    <section className="top-recipe">
      <h2>Top Recipe</h2>
      <div className="recipe-details">
        <img src="/assets/pic1.jpg" alt="Top Recipe" />
        <div className="recipe-info">
          <h3>Recipe Name</h3>
          <p>Detailed description of the top recipe. This recipe stands out for its flavor and simplicity.</p>
        </div>
      </div>
    </section>
  );
};

export default TopRecipe;
