import React from 'react';
import './FeaturedRecipes.css';

const FeaturedRecipes = () => {
  const recipes = [
    {
      id: 1,
      image: require('../assets/recipe1.jpg'),
      title: 'Vegan Chocolate Cake',
      description: 'Rich and creamy vegan chocolate cake.'
    },
    {
      id: 2,
      image: require('../assets/recipe2.jpg'),
      title: 'Spicy Ramen Noodles',
      description: 'Hot and spicy ramen noodles with veggies.'
    },
    {
      id: 3,
      image: require('../assets/recipe3.jpg'),
      title: 'Grilled Chicken Skewers',
      description: 'Juicy and tender grilled chicken skewers.'
    }
  ];

  return (
    <section className="featured-recipes">
      <h2>Featured Recipes</h2>
      <div className="recipes">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button>View Recipe</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;
