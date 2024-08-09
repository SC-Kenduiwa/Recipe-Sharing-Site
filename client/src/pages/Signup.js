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
                'https://api.cloudinary.com/v1_1/dgf4hmhqn/image/upload',
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

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        let profileImageUrl = null;
        if (image) {
            profileImageUrl = await handleImageUpload(image);
            if (!profileImageUrl) {
                setError('Image upload failed');
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
            setError(err.response?.data?.error || 'Error signing up: ' + err.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="login-container">
            <div className="image-section">
                <div className="image-text">
                    <h1>Embark on a culinary journey with us!</h1>
                    <p>Sign up to unlock a world of delicious recipes and personalized cooking experiences</p>
                </div>
            </div>
            <div className="login-section">
                <div className="login-form">
                    <h2>Sign up</h2>
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
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
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
            </div>
        </div>
    );
};

export default Signup;
