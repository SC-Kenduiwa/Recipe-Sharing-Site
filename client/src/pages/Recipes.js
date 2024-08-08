import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard'
import SearchRecipe from './SearchRecipe'
import Filter from './Filter'
import './Recipes.css'

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    ingredients: '',
    createdDateTime: ''
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5555/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data.recipes))
  }, []);

  const handleSearchChange = (searchInput) => {
    setSearch(searchInput)
  };

  const handleFilterToggle = () => {
    setShowFilter(prevState => !prevState);
  };

  const handleFilterApply = (filterValues) => {
    setFilters(filterValues);
    setShowFilter(false);
  };

  const filteredAndSearchedRecipes = recipes.filter(recipe => {
    const matchesCountry = filters.country === '' || recipe.country.toLowerCase().includes(filters.country.toLowerCase());
    const matchesIngredients = filters.ingredients === '' || recipe.ingredients.toLowerCase().includes(filters.ingredients.toLowerCase());
    const matchesDate = filters.createdDateTime === '' || recipe.createdDateTime === filters.createdDateTime;

    const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(search.toLowerCase());

    return matchesCountry && matchesIngredients && matchesDate && matchesSearch;
  });

  return (
    <div className='recipe-container'>
      <h2 className='heading'>Recipes</h2>
      <SearchRecipe search={search} onSearchChange={handleSearchChange} />
      <button className='filter-button' onClick={handleFilterToggle}>
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilter && <Filter onFilter={handleFilterApply}/>}
      {filteredAndSearchedRecipes.length > 0 ? (
        <RecipeCard recipes={filteredAndSearchedRecipes} />
      ) : (
        <p className='no-results-message'>No recipes found matching your criteria.</p>
      )}
    </div>
  );
};

export default Recipes;
