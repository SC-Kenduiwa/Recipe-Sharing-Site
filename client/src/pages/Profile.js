import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import Card from './Card';
import './Profile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

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

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="profile-section">
            <div className="user-info">
              <div className="user-image-container">
                <img src={userData.profile_image_url} alt="Profile" className="user-image" />
              </div>
              <div className="user-details">
                <h2>Welcome, {userData.username}</h2>
                <p><strong>Email:</strong> {userData.email}</p>
                <div className="button-container">
                  <Link to="/editprofile" className="update-profile-button">
                    <i className="fas fa-user-edit"></i>
                    <span>Edit Profile</span>
                  </Link>
                  <Link to="/newrecipe" className="update-profile-button">
                    <i className="fas fa-plus-circle"></i>
                    <span>Add New Recipe</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
        case 'recipes':
          return (
            <div className={`recipes ${recipes.length === 0 ? 'recipes-empty' : ''}`}>
              <h2>My Recipes</h2>
              {recipes.length > 0 ? <Card recipes={recipes} /> : <p>No recipes added yet.</p>}
            </div>
          );
        case 'bookmarks':
          return (
            <div className={`bookmarks ${bookmarks.length === 0 ? 'bookmarks-empty' : ''}`}>
              <h2>My Bookmarks</h2>
              {bookmarks.length > 0 ? <RecipeCard recipes={bookmarks} /> : <p>No bookmarks added yet.</p>}
            </div>
          );
      default:
        return null;
    }
  };

  if (isLoading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div className="error">No user data available</div>;

  return (
    <div className="user-profile">
      <div className="sidebar">
        <h3>Manage Your Account</h3>
        <ul>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <i className="fas fa-user"></i> Profile
          </li>
          <li className={activeTab === 'recipes' ? 'active' : ''} onClick={() => setActiveTab('recipes')}>
            <i className="fas fa-utensils"></i> My Recipes
          </li>
          <li className={activeTab === 'bookmarks' ? 'active' : ''} onClick={() => setActiveTab('bookmarks')}>
            <i className="fas fa-bookmark"></i> Bookmarks
          </li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default UserProfile;