import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './RecipeCardd.css';

const RecipeCard = ({ id, image, title, description, averageRating }) => {
  return (
    <Link to={`/recipes/${id}`} className="recipe-card-link">
      <div className="recipe-card">
        <img src={image} alt={title} className="recipe-image" />
        <div className="recipe-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="recipe-rating-card">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={star <= averageRating ? 'star-filled' : 'star-empty'}
              />
            ))}
            <span>{typeof averageRating === 'number' ? averageRating.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;