import React, { useState } from 'react';
import { resetPassword } from '../components/api';

function PasswordResetPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordReset = async () => {
        setIsLoading(true);
        try {
            const response = await resetPassword(email);
            setMessage(response.message);
        } catch (error) {
            setMessage('Error resetting password. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Password Reset</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handlePasswordReset} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Password Reset Link'}
            </button>
            <p>{message}</p>
        </div>
    );
}

export default PasswordResetPage;
