import React, { useEffect, useState, useCallback } from 'react'
import recipepage1 from '../assets/recipepage1.jpg';
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
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalPages: 1,
  });

  const fetchRecipes = useCallback(() => {
    const params = new URLSearchParams({
      search: search,
      country: filters.country,
      ingredients: filters.ingredients,
      createdDateTime: filters.createdDateTime,
      page: pagination.page,
      perPage: pagination.perPage,
    })

    fetch(`http://127.0.0.1:5555/recipes?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes)
        setPagination(prev => ({
          ...prev,
          totalPages: data.total_pages
        }))
      })
  }, [search, filters, pagination.page, pagination.perPage]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleSearchChange = (searchInput) => {
    setSearch(searchInput)
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterToggle = () => {
    setShowFilter(prevState => !prevState);
  };

  const handleFilterApply = (filterValues) => {
    setFilters(filterValues);
    setPagination(prev => ({ ...prev, page: 1 }));
    setShowFilter(false);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
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
      <div className='image-container'>
        <img src={recipepage1} alt='recipepage' className='recipe-image' />
        <h2 className='heading'>Fuel your body & soul - find <span className="recipe-highlight">RECIPES </span>that taste <span className="recipe-highlight">AMAZING!</span>
        </h2>
        <SearchRecipe search={search} onSearchChange={handleSearchChange} />
      </div>
      <button className='filter-button' onClick={handleFilterToggle}>
        <i className="fa fa-filter" aria-hidden="true"></i>
        {showFilter ? 'Hide Filters' : 'Show Filters'}
      </button>
      {showFilter && <Filter onFilter={handleFilterApply} />}
      {filteredAndSearchedRecipes.length > 0 ? (
        <>
          <RecipeCard recipes={filteredAndSearchedRecipes} />
          <div className="pagination-control">
            <button className="pagination-button" onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}>
              Previous
            </button>
            <span className='pagination-info'>Page {pagination.page} of {pagination.totalPages}</span>
            <button className="pagination-button" onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p className='no-results-message'>No recipes found matching your criteria.</p>
      )}
    </div>
  );
};

export default Recipes;
