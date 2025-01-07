import React, { useState } from 'react';
import { signup } from '../components/api';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { signupValidation } from '../customFunctions/validation.jsx'

function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { isValid, newErrors } = signupValidation(formData);

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await signup(formData.username, formData.password, formData.email);
            if (response.success) {
                navigate('/login');
            } else {
                setErrors(prev => ({
                    ...prev,
                    general: response.message || 'Signup failed'
                }));
            }
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                general: 'Error during signup'
            }));
        }
    };

    return (
        <div className="signup-page">
            <div className="image-section">
                <img
                    src="/unsplash pics/signuppic.jpeg"
                    alt="Healthy food and recipe browsing"
                />
            </div>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSignup}>
                    <h2 className="signup-title">Sign Up</h2>

                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input-field"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-message">{errors.username}</p>}
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input-field"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input-field"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="input-field"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>

                    {errors.general && <p className="error-message">{errors.general}</p>}

                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>

                    <div className="login-link">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;