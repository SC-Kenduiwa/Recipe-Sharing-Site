import React from 'react'
import './SearchRecipe.css'

function SearchRecipe() {
  return (
    <div className='search-recipe'>
        <input className="search" type="text" placeholder="Search recipe..." />
    </div>
  )
}

export default SearchRecipe