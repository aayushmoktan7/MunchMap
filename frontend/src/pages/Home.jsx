import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <div>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <h1>Home page under construction !!!!</h1>
        </div>
    );
}

export default HomePage;