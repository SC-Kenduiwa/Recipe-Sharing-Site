import React, { useEffect, useState, useCallback } from 'react'
import recipepage1 from '../assets/recipepage1.jpg';
import RecipeCard from './RecipeCard'
import SearchRecipe from './SearchRecipe'
import Filter from './Filter'
import './Recipes.css'

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filterInputs, setFilterInputs] = useState({
    country: '',
    rating: '',
    ingredients: '',
    servings: '',
    createdDateTime: '',
  });

  const [appliedFilters, setAppliedFilters] = useState({
    country: '',
    rating: '',
    ingredients: '',
    servings: '',
    createdDateTime: '',
  });

  useEffect(() => {
    fetchRecipes(currentPage, searchTerm, appliedFilters);
  }, [currentPage, searchTerm, appliedFilters]);

  const fetchRecipes = async (page, search, filters) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page,
        per_page: 12,
        search: search,
        ...filters
      });

      // Remove empty parameters
      for (let [key, value] of queryParams.entries()) {
        if (value === '') {
          queryParams.delete(key);
        }
      }

      const response = await fetch(`/recipes?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      if (data.recipes.length === 0) {
        navigate('/notfound');
      } else {
        setRecipes(data.recipes);
        setTotalPages(data.total_pages);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFilterInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    // Convert rating and servings to numbers before applying
    const appliedRating = filterInputs.rating ? parseFloat(filterInputs.rating) : '';
    const appliedServings = filterInputs.servings ? parseInt(filterInputs.servings) : '';
    setAppliedFilters({
      ...filterInputs,
      rating: appliedRating,
      servings: appliedServings
    });
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="recipe-page-container">
      <div className="filter-section">
        <h2>Categories</h2>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={filterInputs.country}
          onChange={handleFilterInputChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Minimum Rating"
          value={filterInputs.rating}
          onChange={handleFilterInputChange}
          min="1"
          max="5"
          step="0.1"
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={filterInputs.ingredients}
          onChange={handleFilterInputChange}
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={filterInputs.servings}
          onChange={handleFilterInputChange}
          min="1"
        />
        <input
          type="date"
          name="createdDateTime"
          value={filterInputs.createdDateTime}
          onChange={handleFilterInputChange}
        />
        <button onClick={handleApplyFilters} className='filter-button'>Apply Filters</button>
      </div>
      <div className="main-content">
        <SearchBar onSearch={handleSearch} />
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <RecipeCardd
              key={recipe.id}
              id={recipe.id}
              image={recipe.recipe_image_url}
              title={recipe.title}
              description={recipe.description}
              averageRating={recipe.average_rating}
            />
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FaArrowLeft />
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
         <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;