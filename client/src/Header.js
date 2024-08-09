import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="container">
            <nav className="nav">
                <div className="logo">
                    <NavLink to="/">
                        <span className="recipe">Recipe</span>
                        <span className="connect">Connect</span>
                    </NavLink>
                </div>
                <ul className="main-nav">
                    <li>
                        <NavLink to="/" className={({isActive}) => isActive ? 'home active' : 'home'}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({isActive}) => isActive ? 'about active' : 'about'}>About Us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/recipes" className={({isActive}) => isActive ? 'recipes active' : 'recipes'}>Recipes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={({isActive}) => isActive ? 'profile active' : 'profile'}>Profile</NavLink>
                    </li>
                </ul>
                <ul className="auth-nav">
                    <li>
                        <NavLink to="/signup" className={({isActive}) => isActive? 'signup active' : 'signup'}>Sign Up</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={({isActive}) => isActive? 'login active' : 'login'}>Log In</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;