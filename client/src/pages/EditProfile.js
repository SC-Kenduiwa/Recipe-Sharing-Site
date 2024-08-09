import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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
        formData.append('upload_preset', 'recipe'); // Your signed upload preset

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
            console.error('Error uploading image:', err);
            setError('Error uploading image: ' + (err.response?.data?.error?.message || err.message));
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        let profileImageUrl = currentImage;
        if (image) {
            try {
                profileImageUrl = await handleImageUpload(image);
                if (!profileImageUrl) {
                    console.error('Image upload failed');
                    return;
                }
            } catch (uploadError) {
                console.error('Error in handleImageUpload:', uploadError);
                setError('Error uploading image: ' + uploadError.message);
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
            console.error('Error updating profile:', err);
            setError(err.response?.data?.error || 'Error updating profile: ' + err.message);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="photo-upload">
                    <label htmlFor="file-input" className="upload-label">
                        <span>Change profile photo</span>
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                {currentImage && (
                    <div className="current-image">
                        <img src={currentImage} alt="Current profile" />
                    </div>
                )}
                <button type="submit" className="update-button">Update Profile</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
};

export default EditProfile;