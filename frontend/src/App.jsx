import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import PasswordResetPage from './pages/PasswordReset'
import { getAuthToken, removeAuthToken } from './components/api';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setIsAuthenticated(false);
  };


  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ?
              <Navigate to="/home" replace /> :
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/password-reset"
          element={<PasswordResetPage />}
        />
        <Route
          path="/home"
          element={
            isAuthenticated ?
              <HomePage onLogout={handleLogout} /> :
              <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App
