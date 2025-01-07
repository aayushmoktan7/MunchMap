import React, { useState } from 'react';
import { loginAPI } from '../components/api';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginAPI(username, password);
            console.log("Response received from login:", response);

            if (response.message && response.token) {
                localStorage.setItem('authToken', response.token);
                setIsAuthenticated(true);
                setMessage(response.message);
                navigate('/home');
            } else {
                setMessage('Invalid response from server');
            }
        } catch (error) {
            console.error("Error during login:", error);
            setMessage('Error during login');
        }
    };

    return (
        <div className="login-page">
            <div className="image-section">
                <img src="/unsplash pics/loginpic.jpg" alt="Login Illustration" />
            </div>

            <div className="login-container">
                <div className="login-form">
                    <h2 className="login-title">Log In</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            className="input-field"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="login-button" onClick={handleLogin}>Log In</button>
                    <p className="error-message">{message}</p>
                    <div className="signup-link">
                        <p>Don't have an account?</p>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
