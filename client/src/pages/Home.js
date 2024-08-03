import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const Home = () => (
    <div className="home">
        <img src="/assets/images/featured-image.jpg" alt="Featured" className="featured-image" />
        <SearchBar />
        <div className="featured-recipes">
            <h2>Featured Recipes</h2>
            <div className="recipe-cards">
                <RecipeCard image="client/src/assets/images/fried-spaghetti.jpg" title="Fried Spaghetti" description="The ultimate hangover recipe" />
                <RecipeCard image="client/src/assets/images/meat-deluxe-pizza.jpg" title="Meat Deluxe Pizza" description="The ultimate hangover recipe" />
                <RecipeCard image="client/src/assets/images/grilled-chicken.jpg" title="Grilled Chicken" description="The ultimate hangover recipe" />
            </div>
        </div>
    </div>
);

export default Home;

