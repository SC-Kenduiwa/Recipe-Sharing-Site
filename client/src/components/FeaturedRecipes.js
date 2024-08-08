import React from 'react';
import './FeaturedRecipes.css';

const FeaturedRecipes = () => {
  return (
    <section className="featured-recipes">
      <h2>Featured Recipes</h2>
      <div className="recipes-container">
        <div className="recipe-card">
          <img src="client/src/assets/recipe1.jpg" alt="Recipe" />
          <div className="recipe-info">
            <h3>Recipe Name 1</h3>
            <p>Short description of the recipe.</p>
          </div>
        </div>
        <div className="recipe-card">
          <img src="client/src/assets/recipe2.jpg" alt="Recipe" />
          <div className="recipe-info">
            <h3>Recipe Name 2</h3>
            <p>Short description of the recipe.</p>
          </div>
        </div>
        <div className="recipe-card">
          <img src="pclient/src/assets/recipe3.jpg" alt="Recipe" />
          <div className="recipe-info">
            <h3>Recipe Name 3</h3>
            <p>Short description of the recipe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
