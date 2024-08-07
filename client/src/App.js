import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FeaturedRecipes from './components/FeaturedRecipes';
import TopRecipe from './components/TopRecipe';
import Footer from './components/Footer';
import Recipes from './pages/Recipes';  
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <FeaturedRecipes />
      <TopRecipe />
      <Recipes/>
      <Footer />
    </div>
  );
}

export default App
