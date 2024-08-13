import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EditProfile from './pages/EditProfile';
import EditRecipe from './pages/EditRecipe';
import NewRecipe from './pages/NewRecipe';
import NotFound from './pages/NotFound';


const App = () => {
  return (
    <Router>

      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editrecipe/:id" element={<EditRecipe />} />
          <Route path="/newrecipe" element={<NewRecipe />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};


export default App;

