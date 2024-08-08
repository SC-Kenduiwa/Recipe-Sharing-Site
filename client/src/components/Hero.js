import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Delicious Food & Recipes For Your Loved ones</h1>
        <p>Explore our wide range of recipes that will make your meals special.</p>
        <button className="hero-button">Get Started</button>
      </div>
      <div className="hero-images">
        <img src="client/src/assets/picture1.jpeg" alt="Delicious food" />
        <img src="client/src/assets/picture2.jpeg" alt="Delicious food" />
        <img src="client/src/assets/picture3.jpeg" alt="Delicious food" />
      </div>
    </section>
  );
};

export default Hero;
