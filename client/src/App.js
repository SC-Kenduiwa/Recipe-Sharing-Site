import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FeaturedRecipes from './components/FeaturedRecipes';
import TopRecipe from './components/TopRecipe';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <FeaturedRecipes />
      <TopRecipe />
      <Footer />
    </div>
  );
}

export default App;
