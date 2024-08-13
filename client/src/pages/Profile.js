import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import './Profile.css';
import Card from './Card'

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
    if (activeTab === 'profile') {
      return (
        <div className="profile-section">
          <div className="user-info">
            <div className="user-image-container">
              <img src={userData.profile_image_url} alt="Profile" className="user-image" />
            </div>
            <div className="user-details">
              <p><strong>Hello, </strong> {userData.username}</p>
              <p><strong>Your email is:</strong> {userData.email}</p>
              <div className="button-container">
                <button className="update-profile-button">
                  <Link to="/editprofile">Edit Profile</Link>
                </button>
                <button className='update-profile-button'>
                  <Link to="/newrecipe">Add New Recipe</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    else if (activeTab === 'recipes') {
      return (
        <div className="recipes">
          {recipes.length > 0 ? (
            <Card recipes={recipes} />
          ) : (
            <p>No recipes added yet.</p>
          )}
        </div>
      );
    }

    else if (activeTab === 'bookmarks') {
      return (
        <div className="bookmarks">
          {bookmarks.length > 0 ? (
            <RecipeCard recipes={bookmarks} />
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
        <h3>Manage Your Account</h3>
        <ul>
          <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
          <li className={activeTab === 'recipes' ? 'active' : ''} onClick={() => setActiveTab('recipes')}>My Recipes</li>
          <li className={activeTab === 'bookmarks' ? 'active' : ''} onClick={() => setActiveTab('bookmarks')}>Bookmarks</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default UserProfile;