import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Delicious Food & Recipes For Your Loved Ones</h1>
      <button>Explore Recipes</button>
      <div className="header-images">
        <img src={require('../assets/image1.jpg')} alt="Delicious food" />
        <img src={require('../assets/image2.jpg')} alt="Delicious food" />
        <img src={require('../assets/image3.jpg')} alt="Delicious food" />
      </div>
    </header>
  );
};

export default Header;
