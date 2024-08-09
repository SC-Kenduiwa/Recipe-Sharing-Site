import React from 'react'
import './RecipeCard.css'

import { Link } from 'react-router-dom';


function RecipeCard({ recipes }) {
  return (
    <div className='recipelist-container'>
      {recipes.map(({ id, recipe_image_url, title, description, country, servings, cooking_time }) => (
        <div className="card" key={id}>
          <img src={recipe_image_url} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-country"><i class="fa fa-globe" aria-hidden="true"></i>
            {country}</p>
            <p className="card-description">{description}</p>

            
            <small>{servings} servings</small>
            <small><i class="fa fa-clock-o" aria-hidden="true"></i>
             {cooking_time} mins</small>
            <Link to={`/recipes/${id}`} className="btn btn-primary">View Recipe</Link>

          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeCard