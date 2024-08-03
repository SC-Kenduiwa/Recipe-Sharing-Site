import React from 'react';
import './SearchBar.css';

const SearchBar = () => (
    <div className="search-bar">
        <input type="text" placeholder="Search recipe..." />
        <button>Search</button>
    </div>
);

export default SearchBar;
