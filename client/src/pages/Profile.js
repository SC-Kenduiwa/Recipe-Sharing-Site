import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5555/profile');
      const { user, recipes, bookmarks } = response.data;
      setUserData(user);
      setRecipes(recipes);
      setBookmarks(bookmarks);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!userData) return <div>Data-Fetching failed</div>;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-info">
        <img src={userData.profile_image_url} alt="Profile" />
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <div>
          <button>Update Profile</button>
        </div>
      </div>
      <div className="recipes">
        <h2>Recipes</h2>
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-item">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
      <div className="bookmarks">
        <h2>Bookmarks</h2>
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="bookmark-item">
            <h3>{bookmark.title}</h3>
            <p>{bookmark.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
