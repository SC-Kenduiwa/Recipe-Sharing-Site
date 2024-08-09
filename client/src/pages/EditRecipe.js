import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './NewRecipe.css';
import { FaArrowLeft } from 'react-icons/fa';

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [imageLabel, setImageLabel] = useState('Change photo');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('Recipe ID is missing');
        setLoading(false);
        return;
      }

      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const recipe = response.data.recipe;
        setFormData({
          title: recipe.title || '',
          description: recipe.description || '',
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients || '',
          procedure: Array.isArray(recipe.procedure) ? recipe.procedure.join('\n') : recipe.procedure || '',
          servings: recipe.servings || '',
          cooking_time: recipe.cooking_time || '',
          difficulty_level: recipe.difficulty_level || '',
          country: recipe.country || '',
        });
        setImageLabel('Change photo');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to fetch recipe details: ' + (err.response?.data?.error || err.message));
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

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
      ...(recipeImageUrl && { recipe_image_url: recipeImageUrl }),
      title: formData.title,
      description: formData.description,
      ingredients: formData.ingredients.split('\n').filter(item => item.trim() !== '').join(','),
      procedure: formData.procedure.split('\n').map((item) => item.trim()).join('\n'),
      servings: parseInt(formData.servings),
      cooking_time: parseInt(formData.cooking_time),
      difficulty_level: formData.difficulty_level,
      country: formData.country,
    };

    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.put(`/recipes/${id}`, recipeData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/recipes');
    } catch (err) {
      console.error('Recipe update failed:', err);
      setError(err.response?.data?.error || 'Failed to update recipe: ' + err.message);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.delete(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate('/recipes');
    } catch (err) {
      console.error('Recipe deletion failed:', err);
      setError(err.response?.data?.error || 'Failed to delete recipe: ' + err.message);
    }
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="super-obnoxious-recipe-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back
      </button>
      <h2 className="super-obnoxious-title">Edit Recipe</h2>
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
            placeholder="Enter ingredients separated by new lines"
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
            onClick={handleDeleteClick}
          >
            Delete Recipe
          </button>
          <button type="submit" className="super-obnoxious-submit-button">
            Update Recipe
          </button>
        </div>
      </form>
      {error && <p className="super-obnoxious-error-message">{error}</p>}

      {showDeleteConfirmation && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this recipe?</p>
            <div className="delete-confirmation-actions">
              <button onClick={handleDeleteConfirm} className="confirm-delete-btn">Yes, Delete</button>
              <button onClick={handleDeleteCancel} className="cancel-delete-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRecipe;