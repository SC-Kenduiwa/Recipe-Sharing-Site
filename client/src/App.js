import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipes from './pages/Recipes';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <main className="main-content">
          <Routes>                      
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;