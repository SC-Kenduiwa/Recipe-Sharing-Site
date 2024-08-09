import React from 'react'
import './SearchRecipe.css'

function SearchRecipe({ search, onSearchChange }) {

    return (
        <div className="search-container">
            <div className='search-recipe'>
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                    className="search"
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search recipe by name, ingredient..."
                />
            </div>
        </div>
    )
}

export default SearchRecipe