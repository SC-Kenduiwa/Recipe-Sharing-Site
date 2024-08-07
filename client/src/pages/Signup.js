import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'RECIPE');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dsmof3lkd/image/upload',
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

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        let profileImageUrl = null;
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
            const response = await axios.post('/users', {
                username,
                email,
                password,
                profile_image_url: profileImageUrl
            });

            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            navigate('/login');
        } catch (err) {
            console.error('Error in signup:', err);
            setError(err.response?.data?.error || 'Error signing up: ' + err.message);
        }
    };

    // Function to handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    };

    // Cleanup function for the image preview
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="signup-container">
            <h2>Sign up</h2>
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
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="photo-upload">
                    <label htmlFor="file-input" className="upload-label">
                        <span>Upload Photo</span>
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Image Preview" />
                        </div>
                    )}
                </div>
                <button type="submit" className="signup-button">Create an account</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p className="login-link">
                Already have an account? <a href="/login">Log in</a>
            </p>
        </div>
    );
};

export default Signup;
