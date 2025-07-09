import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import '../styles/register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    securityQuestion: 'madre',
    securityAnswer: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h2>Crear Cuenta</h2>
        <p>Regístrate para comenzar</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>
        
        <div className="form-group">
          <label>Pregunta de Seguridad</label>
          <select 
            name="securityQuestion" 
            value={formData.securityQuestion}
            onChange={handleChange}
            required
          >
            <option value="madre">¿Cuál es el nombre de tu madre?</option>
            <option value="mascota">¿Cuál es el nombre de tu primera mascota?</option>
            <option value="ciudad">¿En qué ciudad naciste?</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Respuesta</label>
          <input
            type="text"
            name="securityAnswer"
            value={formData.securityAnswer}
            onChange={handleChange}
            required
            placeholder="Tu respuesta"
          />
          <p className="hint">Esta respuesta te ayudará a recuperar tu cuenta si olvidas tu contraseña</p>
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Crear Cuenta'}
        </button>
      </form>
      
      <div className="login-link">
        ¿Ya tienes cuenta? <button onClick={() => navigate('/login')}>Inicia sesión</button>
      </div>
    </div>
  );
};

export default RegisterForm;