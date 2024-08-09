import React from 'react'
import './RecipeCard.css'

function RecipeCard({ recipes }) {
  return (
    <div className='recipelist-container'>
      {recipes.map(({ id, recipe_image_url, title, description, country, cooking_time }) => (
        <div className="card" key={id}>
          <img src={recipe_image_url} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-description">{description}</p>
            <p className="card-country">{country}</p>
            <small>{cooking_time} mins</small>

            <button className="btn btn-primary">View Recipe</button>

           
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeCard