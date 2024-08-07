import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ image, title, description }) => (
    <div className="recipe-card">
        <img src={image} alt={title} className="recipe-image" />
        <div className="recipe-content">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
);

export default RecipeCard;
