import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error al registrar usuario';
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error al iniciar sesión';
  }
};

export const verifySecurityAnswer = async (email, answer) => {
  try {
    const response = await api.post('/verify-answer', { email, securityAnswer: answer });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Respuesta incorrecta';
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await api.post('/reset-password', { email, newPassword });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Error al restablecer contraseña';
  }
};

export const getSecurityQuestion = async (email) => {
  try {
    const response = await api.get(`/security-question/${email}`);
    return response.data.securityQuestion;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener la pregunta de seguridad';
  }
};