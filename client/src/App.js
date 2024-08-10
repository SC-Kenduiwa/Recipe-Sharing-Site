import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroImage from './components/HeroImage';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><HeroImage /><Home /></>} />
          <Route path="/about" element={<><HeroImage /><About /></>} />
          <Route path="/recipes" element={<><HeroImage /><Recipes /></>} />
          <Route path="/profile" element={<><HeroImage /><Profile /></>} />
          <Route path="/editprofile" element={<><HeroImage /><EditProfile /></>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
