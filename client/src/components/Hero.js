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
        <img src="/assets/picture1.jpg" alt="Delicious food" />
        <img src="/assets/picture2.jpg" alt="Delicious food" />
        <img src="/assets/picture3.jpg" alt="Delicious food" />
      </div>
    </section>
  );
};

export default Hero;
