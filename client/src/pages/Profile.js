import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
    else{
      fetchUserProfile(token);
    }
  }, []);
 
  const fetchUserProfile = async (token) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/profile', {
        headers: {'Authorization': `Bearer ${token}`}
      });
      const { user, recipes, bookmarks } = response.data;
      setUserData(user);
      setRecipes(recipes);
      setBookmarks(bookmarks);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <div className="profile-section">
          <div className="user-info">
            <div className="user-image-container">
              <img src={userData.profile_image_url} alt="Profile" className="user-image" />
            </div>
            <div className="user-details">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <button className="update-profile-button">
                <Link to="/editprofile">Edit Profile</Link>
              </button>
            </div>
          </div>
        </div>
      );
    } 
    else if (activeTab === 'recipes') {
      return (
        <div className="recipes">
          <h2>My Recipes</h2>
          {recipes.length > 0 ? (
            recipes.map(recipe => (
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
            ))
          ) : (
            <p>No recipes added yet.</p>
          )}
        </div>
      );
    } 
    else if (activeTab === 'bookmarks') {
      return (
        <div className="bookmarks">
          <h2>Bookmarks</h2>
          {bookmarks.length > 0 ? (
            bookmarks.map(bookmark => (
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
            ))
          ) : (
            <p>No bookmarks added yet.</p>
          )}
        </div>
      );
    }
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data available</div>;

  return (
    <div className="user-profile">
      <div className="sidebar">
        <h3>My Profile</h3>
        <ul>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
          <li className={activeTab === 'recipes' ? 'active' : ''} onClick={() => setActiveTab('recipes')}>My Recipes</li>
          <li className={activeTab === 'bookmarks' ? 'active' : ''} onClick={() => setActiveTab('bookmarks')}>Bookmarks</li>
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default UserProfile;
