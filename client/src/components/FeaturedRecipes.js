import React from 'react';
import './FeaturedRecipes.css';

const FeaturedRecipes = () => {
<<<<<<< HEAD
=======
  const recipes = [
    {
      id: 1,
      image: require('../assets/images/recipe1.jpg'),
      title: 'Vegan Chocolate Cake',
      description: 'Rich and creamy vegan chocolate cake.'
    },
    {
      id: 2,
      image: require('../assets/images/recipe2.jpg'),
      title: 'Spicy Ramen Noodles',
      description: 'Hot and spicy ramen noodles with veggies.'
    },
    {
      id: 3,
      image: require('../assets/images/recipe3.jpg'),
      title: 'Grilled Chicken Skewers',
      description: 'Juicy and tender grilled chicken skewers.'
    }
  ];

>>>>>>> Aden
  return (
    <section className="featured-recipes">
      <h2>Featured Recipes</h2>
      <div className="recipes-container">
        <div className="recipe-card">
          <img src="/assets/recipe1.jpg" alt="Recipe 1" />
          <div className="recipe-info">
            <h3>Recipe Name 1</h3>
            <p>Short description of the recipe.</p>
          </div>
        </div>
        <div className="recipe-card">
          <img src="/assets/recipe2.jpg" alt="Recipe 2" />
          <div className="recipe-info">
            <h3>Recipe Name 2</h3>
            <p>Short description of the recipe.</p>
          </div>
        </div>
        <div className="recipe-card">
          <img src="/assets/recipe3.jpg" alt="Recipe 3" />
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
