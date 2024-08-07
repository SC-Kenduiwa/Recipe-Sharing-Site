import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewRecipe.css';

const NewRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    procedure: '',
    servings: '',
    cooking_time: '',
    difficulty_level: '',
    country: '',
  });
  const [image, setImage] = useState(null);
  const [imageLabel, setImageLabel] = useState('Add a photo');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setImageLabel(selectedFile.name);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'recipe');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dmze7emzl/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Error uploading image: ' + err.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let recipeImageUrl = null;
    if (image) {
      recipeImageUrl = await handleImageUpload(image);
      if (!recipeImageUrl) return;
    }

    const recipeData = {
      recipe_image_url: recipeImageUrl,
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients,
      procedure: formData.procedure,
      servings: parseInt(formData.servings),
      cooking_time: parseInt(formData.cooking_time),
      difficulty_level: formData.difficulty_level,
      country: formData.country,
    };

    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post('/recipes', recipeData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/recipes');
    } catch (err) {
      console.error('Recipe creation failed:', err);
      setError(err.response?.data?.error || 'Failed to create recipe');
    }
  };

  return (
    <div className="super-obnoxious-recipe-container">
      <h2 className="super-obnoxious-title">Add a Recipe</h2>
      <form className="super-obnoxious-form" onSubmit={handleSubmit}>
        <div className="super-obnoxious-photo-upload">
          <label htmlFor="file-input" className="super-obnoxious-upload-label">
            <button
              type="button"
              className="super-obnoxious-submit-button"
              onClick={() => document.getElementById('file-input').click()}
            >
              {imageLabel}
            </button>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="super-obnoxious-form-group">
          <label className="super-obnoxious-label">Recipe Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="super-obnoxious-input"
          />
        </div>

        <div className="super-obnoxious-form-group">
          <label className="super-obnoxious-label">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="super-obnoxious-textarea"
          ></textarea>
        </div>

        <div className="super-obnoxious-form-row">
          <div className="super-obnoxious-form-group super-obnoxious-half-width">
            <label className="super-obnoxious-label">Servings *</label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              required
              className="super-obnoxious-input"
            />
          </div>
          <div className="super-obnoxious-form-group super-obnoxious-half-width">
            <label className="super-obnoxious-label">Cooking Time (minutes) *</label>
            <input
              type="number"
              name="cooking_time"
              value={formData.cooking_time}
              onChange={handleChange}
              required
              className="super-obnoxious-input"
            />
          </div>
        </div>

        <div className="super-obnoxious-form-group">
          <label className="super-obnoxious-label">Ingredients *</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients separated by commas"
            required
            className="super-obnoxious-textarea"
          ></textarea>
        </div>

        <div className="super-obnoxious-form-group">
          <label className="super-obnoxious-label">Procedure *</label>
          <textarea
            name="procedure"
            value={formData.procedure}
            onChange={handleChange}
            placeholder="Enter steps separated by new lines"
            required
            className="super-obnoxious-textarea"
          ></textarea>
        </div>

        <div className="super-obnoxious-form-group">
          <label className="super-obnoxious-label">Difficulty Level *</label>
          <select
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleChange}
            required
            className="super-obnoxious-select"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="super-obnoxious-form-group">
          <label className="super-obnoxious-label">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="super-obnoxious-input"
          />
        </div>

        <div className="super-obnoxious-form-actions">
          <button
            type="button"
            className="super-obnoxious-cancel-button"
            onClick={() => navigate('/recipes')}
          >
            Cancel
          </button>
          <button type="submit" className="super-obnoxious-submit-button">
            Create Recipe
          </button>
        </div>
      </form>
      {error && <p className="super-obnoxious-error-message">{error}</p>}
    </div>
  );
};

export default NewRecipe;
