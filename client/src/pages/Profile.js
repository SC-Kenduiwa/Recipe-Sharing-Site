import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }else{
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);
 
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('/profile', {
        headers: {'Authorization': `Bearer ${token}`}
      });
      const { user, recipes, bookmarks } = response.data;
      setUserData(user);
      setRecipes(recipes);
      setBookmarks(bookmarks);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!isLoggedIn) return <div>Please log in to view your profile</div>;
  if (!userData) return <div>Data-Fetching failed</div>;

  return (
    <div className="user-profile">

      <div className="user-profile-container">
        <h1>User Profile</h1>
        <div className="user-info">
          <div className="user-image-container">
            <img src={userData.profile_image_url} alt="Profile" className="user-image" />
          </div>
          <div className="user-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <div className="update-button-container">        
              <button className="update-profile-button"><Link to="/editprofile">EditProfile</Link></button>
            </div>
          </div>
        </div>
      </div>

      <div className="recipes">
        <h2>My Recipes</h2>
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-item">
            <div className="recipe-image-container">
              <img src={recipe.recipe_image_url} alt={recipe.title} className="recipe-image" />
            </div>
            <div className="recipe-details">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
              <p><strong>Difficulty:</strong> {recipe.difficulty_level}</p>
              <p><strong>Country:</strong> {recipe.country}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bookmarks">
        <h2>Bookmarks</h2>
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bookmark-item">
            <div className="recipe-image-container">
              <img src={bookmark.recipe_image_url} alt={bookmark.title} className="recipe-image" />
            </div>
            <div className="recipe-details">
              <h3>{bookmark.title}</h3>
              <p>{bookmark.description}</p>
              <p><strong>Cooking Time:</strong> {bookmark.cooking_time} minutes</p>
              <p><strong>Difficulty:</strong> {bookmark.difficulty_level}</p>
              <p><strong>Country:</strong> {bookmark.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
