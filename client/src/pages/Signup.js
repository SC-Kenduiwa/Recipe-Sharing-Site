import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle image upload to Cloudinary
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'RECIPE'); // Your signed upload preset

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dgf4hmhqn/image/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Ensure correct content type
                    }
                }
            );
            return response.data.secure_url; // Return the URL of the uploaded image
        } catch (err) {
            console.error('Error uploading image:', err);
            console.error('Error details:', err.response?.data);
            setError('Error uploading image: ' + (err.response?.data?.error?.message || err.message));
            return null;
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

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
            
            // Handle the tokens returned from the backend
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            
            navigate('/login');
        } catch (err) {
            console.error('Error in signup:', err);
            setError(err.response?.data?.error || 'Error signing up: ' + err.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}
                    />
                </div>
                <button type="submit">Signup</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
