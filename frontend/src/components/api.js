import axios from 'axios';

const API_URL = 'http://localhost:8000';


export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};


export const signup = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_URL}/signup/`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const loginAPI = async (username, password) => {
  try {

    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password,
    });

    console.log("Login response received:", response);

    if (response.data.token) {

      const token = response.data.token;
      console.log("Token received:", token);
      localStorage.setItem('authToken', token);
      return response.data;
    } else {
      throw new Error('No token received from server');
    }

  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }

};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout/`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/api/password-reset/`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Something went wrong during password reset.');
  }
};
