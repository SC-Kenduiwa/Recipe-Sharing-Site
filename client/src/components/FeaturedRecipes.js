import React from 'react';
import './FeaturedRecipes.css';

const FeaturedRecipes = () => {
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

  return (
    <section className="featured-recipes">
      <h2>Featured Recipes</h2>
      <div className="recipes-container">
        <div className="recipe-card">
          <img src="/assets/recipe1.jpg" alt="Sponge Cake" />
          <div className="recipe-info">
            <h3>Sponge Cake</h3>
            <p>A light and fluffy sponge cake that is perfect for any occasion. Serve it with fresh berries and a dollop of whipped cream for a delightful treat.</p>
          </div>
        </div>
        <div className="recipe-card">
          <img src="/assets/recipe2.jpg" alt="Chocolate Cupcake" />
          <div className="recipe-info">
            <h3>Chocolate Cupcake</h3>
            <p>Indulge in these rich and moist chocolate cupcakes topped with creamy chocolate frosting. A favorite for kids' parties and special celebrations.</p>
          </div>
        </div>
        <div className="recipe-card">
          <img src="/assets/cookie1.jpg" alt="Chocolate Chip Cookie" />
          <div className="recipe-info">
            <h3>Chocolate Chip Cookie</h3>
            <p>Enjoy these classic chocolate chip cookies with a crispy edge and a chewy center. Perfect with a glass of milk or as an on-the-go snack.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
