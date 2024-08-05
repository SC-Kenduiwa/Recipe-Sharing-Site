import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import './App.css';

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<div>Recipes</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
    </Router>
);

export default App;
