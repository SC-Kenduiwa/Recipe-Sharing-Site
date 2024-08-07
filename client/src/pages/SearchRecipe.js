import React from 'react'
import './SearchRecipe.css'

function SearchRecipe() {
  return (
    <div className='search-recipe'>
        <i className="fa fa-search" aria-hidden="true"></i>
        <input 
        className="search" 
        type="text" 
        placeholder="Search recipe..." 
        />
    </div>
  )
}

export default SearchRecipe