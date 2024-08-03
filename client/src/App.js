import React from 'react'
import Header from './Header'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import NotFound from './NotFound';
import ServerError from './ServerError';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';
import RecipeList from './RecipeList';
import NewRecipe from './NewRecipe';
import RecipeDetails from './RecipeDetails';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/new-recipe" element={<NewRecipe/>} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </div>
  )
}

export default App
