import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RecoveryForm from './components/RecoveryForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/recovery" element={<RecoveryForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <div className="dashboard">
                  <h2>Dashboard</h2>
                  <p>Bienvenido a tu área personal</p>
                  <button onClick={() => setIsAuthenticated(false)}>Cerrar Sesión</button>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;