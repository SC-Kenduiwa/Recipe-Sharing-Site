import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ image, title, description }) => (
    <div className="recipe-card">
        <img src={image} alt={title} className="recipe-image" />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default RecipeCard;
