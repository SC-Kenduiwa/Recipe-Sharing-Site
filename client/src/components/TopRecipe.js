import React from 'react';
import './TopRecipe.css';

const TopRecipe = () => {
  return (
    <section className="top-recipe">
      <h2>Top Recipe</h2>
      <div className="recipe-details">

        <img src="/assets/pic1.jpg" alt="Top Recipe" className="recipe-image" />

        <div className="recipe-info">
          <h3>Loaded Nachos and Creamy Chicken</h3>
          <p>
            Indulge in a delightful spread featuring loaded nachos topped with seasoned ground meat, melted cheese, and fresh salsa, served with a side of creamy guacamole and sour cream. The nachos are crispy and provide a perfect base for the flavorful toppings, which include a mix of fresh vegetables and savory spices. The combination of textures and tastes makes every bite a culinary delight. Accompanying this is a creamy chicken dish garnished with cherry tomatoes and fresh herbs. The chicken is tender and cooked to perfection, enveloped in a rich, creamy sauce that enhances its natural flavors. This dish is complemented by the juicy sweetness of the cherry tomatoes and the aromatic freshness of the herbs, offering a rich and savory flavor that's perfect for any gathering. Together, these dishes create a harmonious blend of flavors and textures that will leave your taste buds craving more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopRecipe;
