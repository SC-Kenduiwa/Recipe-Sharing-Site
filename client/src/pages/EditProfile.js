import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import './Signup.css';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fileName, setFileName] = useState('Change profile photo');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const { username, email, profile_image_url } = response.data.user;
            setUsername(username);
            setEmail(email);
            setCurrentImage(profile_image_url);
        } catch (err) {
            console.error('Error fetching user profile:', err);
            setError('Failed to load user profile. Please try again.');
        }
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'recipe');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dmze7emzl/image/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data.secure_url;
        } catch (err) {
            setError('Error uploading image: ' + (err.response?.data?.error?.message || err.message));
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        let profileImageUrl = currentImage;
        if (image) {
            profileImageUrl = await handleImageUpload(image);
            if (!profileImageUrl) {
                setLoading(false);
                return;
            }
        }

        try {
            await axios.put('/profile', 
                { username, email, profile_image_url: profileImageUrl },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            setSuccess('Profile updated successfully');
            setTimeout(() => navigate('/profile'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Error updating profile: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setFileName(file ? file.name : 'Change profile photo');
    };

    return (
        <div className="login-container">
            <div className="image-section">
                <div className="image-text">
                    <h1>Update Your Profile</h1>
                    <p>Keep your information up to date for a personalized cooking experience</p>
                </div>
            </div>
            <div className="login-section">
                <div className="login-form">
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="photo-upload">
                            <label htmlFor="file-input" className="upload-label">
                                <span>{fileName}</span>
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        {currentImage && (
                            <div className="current-image">
                                <img src={currentImage} alt="Current profile" />
                            </div>
                        )}
                        <button type="submit" className="signup-button" disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
                        </button>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;