import React, {useEffect, useState} from 'react'
import recipepage1 from '../assets/images/recipepage1.jpg'
import RecipeCard from './RecipeCard'
import SearchRecipe from './SearchRecipe'
import './Recipes.css'

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch ('http://127.0.0.1:5555/recipes')
     .then(response => response.json())
     .then(data => setRecipes(data.recipes))
  }, []);

  const handleSearchChange = (searchInput) => {
      setSearch(searchInput)
  };

  const searchedRecipes = recipes.filter(
      (recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='recipe-container'>
      <img src={recipepage1} alt='recipepage' className='recipe-image'/>
      <h2 className='heading'>Recipes</h2>
      <SearchRecipe search={search} onSearchChange={handleSearchChange}/>
      <RecipeCard recipes={searchedRecipes}/>
    </div>
  )
}

export default Recipes