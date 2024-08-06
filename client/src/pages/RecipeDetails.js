import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShare, FaBookmark, FaStar, FaFacebookF, FaTwitter, FaEnvelope, FaLink, FaWhatsapp } from 'react-icons/fa';
import './RecipeDetails.css';

const ShareButton = ({ recipe }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `Check out this recipe: ${recipe.title}`;

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowShareOptions(false);
    });
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
  };

  const shareToWhatsAppStatus = () => {
    const statusText = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(`https://web.whatsapp.com/send?text=${statusText}`, '_blank');
  };

  return (
    <div className="share-container">
      <button onClick={handleShare} className="share-button">
        <FaShare /> Share
      </button>
      {showShareOptions && (
        <div className="share-options">
          <button onClick={copyToClipboard}><FaLink /> Copy Link</button>
          <button onClick={shareToFacebook}><FaFacebookF /> Facebook</button>
          <button onClick={shareToTwitter}><FaTwitter /> Twitter</button>
          <button onClick={shareViaEmail}><FaEnvelope /> Email</button>
          <button onClick={shareToWhatsAppStatus}><FaWhatsapp /> WhatsApp</button>
        </div>
      )}
    </div>
  );
};

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [ratingColor, setRatingColor] = useState('star-empty');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) {
        setError('Recipe ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/recipes/${id}`);
        setRecipe(response.data.recipe);
        setLoading(false);

        // Check if user is logged in
        const accessToken = localStorage.getItem('access_token');
        setIsLoggedIn(!!accessToken);
      } catch (err) {
        setError('Failed to fetch recipe details');
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(`/recipes/${id}/bookmarks`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
        });
      } else {
        await axios.post(`/recipes/${id}/bookmarks`, {}, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
        });
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleRating = async (value) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/recipes/${id}/ratings`, { value }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      setUserRating(value);
      const response = await axios.get(`/recipes/${id}`);
      setRecipe(response.data.recipe);
      setRatingColor('star-filled'); 
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/recipes/${id}/comments`, { content: comment }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      setComment('');
      // Reload comments
      const response = await axios.get(`/recipes/${id}`);
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  const ensureArray = (item) => {
    if (Array.isArray(item)) return item;
    if (typeof item === 'string') return item.split('\n').filter(line => line.trim() !== '');
    return [];
  };

  const ingredientsList = ensureArray(recipe.ingredients);
  const procedureList = ensureArray(recipe.procedure);

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <div className="recipe-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className={star <= (recipe.average_rating || 0) ? 'star-filled' : 'star-empty'} />
        ))}
        <span>{typeof recipe.average_rating === 'number' ? recipe.average_rating.toFixed(1) : 'N/A'}</span>
      </div>
      <img src={recipe.recipe_image_url} alt={recipe.title} className="recipe-imagee" />

      <div className="recipe-actions">
        <ShareButton recipe={recipe} />
        <button onClick={handleBookmark} className="bookmark-button">
          <FaBookmark color={isBookmarked ? 'gold' : 'gray'} /> Save
        </button>
      </div>
      
      {!isLoggedIn && (
        <p className="login-notice">
          Please <a href="/login">log in</a> to rate, bookmark, or comment on this recipe.
        </p>
      )}
      
      <h2>Overview</h2>
      <p className="recipe-description">{recipe.description}</p>

      <div className="recipe-info">
        <p>Servings: {recipe.servings}</p>
        <p>Cook Time: {recipe.cooking_time} Minutes</p>
        <p>Difficulty: {recipe.difficulty_level}</p>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredientsList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="procedure-section">
          <h2>Instructions</h2>
          <ul className="procedure-list">
            {procedureList.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="user-rating">
        <h3>Rate this recipe</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() => handleRating(star)}
            className={star <= userRating ? ratingColor : 'star-empty'}
          />
        ))}
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {recipe.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <img src={comment.user.profile_image_url} alt={comment.user.username} className="user-avatar" />
            <div className="comment-content">
              <h4>{comment.user.username}</h4>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeDetails;
