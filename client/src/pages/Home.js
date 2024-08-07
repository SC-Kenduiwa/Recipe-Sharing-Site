import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import featuredImage from '../assets/images/featured-image.jpg';
import friedSpaghetti from '../assets/images/fried-spaghetti.jpg';
import meatDeluxePizza from '../assets/images/meat-deluxe-pizza.jpg';
import grilledChicken from '../assets/images/grilled-chicken.jpg';
import './Home.css';

const Home = () => (
    <div className="home">
        <div className="featured-image-container">
            <img src={featuredImage} alt="Featured" className="featured-image" />
        </div>
        <SearchBar />
        <div className="featured-recipes">
            <h2>Featured Recipes</h2>
            <div className="recipe-cards">
                <RecipeCard image={friedSpaghetti} title="Fried Spaghetti" description="The ultimate hangover recipe" />
                <RecipeCard image={meatDeluxePizza} title="Meat Deluxe Pizza" description="The ultimate hangover recipe" />
                <RecipeCard image={grilledChicken} title="Grilled Chicken" description="The ultimate hangover recipe" />
            </div>
        </div>
    </div>
);

export default Home;