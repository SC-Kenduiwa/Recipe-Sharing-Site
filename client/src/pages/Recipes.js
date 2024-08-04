import React, {useEffect, useState} from 'react'
import RecipeCard from './RecipeCard'
import SearchRecipe from './SearchRecipe'
import './Recipes.css'

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    fetch ('http://127.0.0.1:5555/recipes')
     .then(response => response.json())
     .then(data => setRecipes(data.recipes))
  }, []);

  return (
    <div className='recipe-container'>
      <h2 className='heading'>Recipes</h2>
      <SearchRecipe />
      <RecipeCard recipes={recipes}/>
    </div>
  )
}

export default Recipes