import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FeaturedRecipes from './components/FeaturedRecipes';
import TopRecipe from './components/TopRecipe';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<FeaturedRecipes />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/top-recipe" element={<TopRecipe />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

