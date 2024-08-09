import React, { useState } from 'react'
import './Filter.css';

function Filter({ onFilter }) {

    const [country, setCountry] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [createdDateTime, setCreatedDateTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter({ country, ingredients, createdDateTime });
    };

    return (
        <div className='filter-container'>
            <h2>Filter Recipes</h2>
            <form className="filter-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients:</label>
                    <input
                        type="text"
                        id="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="createdDateTime">Created Date:</label>
                    <input
                        type="date"
                        id="createdDateTime"
                        value={createdDateTime}
                        onChange={(e) => setCreatedDateTime(e.target.value)}
                    />
                </div>
                <button type="submit">Apply Filters</button>
            </form>
        </div>
    )
}

export default Filter