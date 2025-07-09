import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSecurityQuestion, verifySecurityAnswer } from '../api/auth';
import '../styles/recovery.css';

const RecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Obtener la pregunta real del usuario
      const question = await getSecurityQuestion(email);
      setSecurityQuestion(question);
      setStep(2);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await verifySecurityAnswer(email, securityAnswer);
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-header">
        <h2>{step === 1 ? 'Recuperar Cuenta' : 'Verificar Identidad'}</h2>
        <p>
          {step === 1 
            ? 'Ingresa tu correo para recuperar tu cuenta' 
            : 'Responde tu pregunta de seguridad'}
        </p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit} className="recovery-form">
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Buscando cuenta...' : 'Continuar'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleAnswerSubmit} className="recovery-form">
          <div className="security-question">
            <label>Pregunta de seguridad</label>
            <div className="question-box">{securityQuestion}</div>
          </div>
          
          <div className="form-group">
            <label>Tu respuesta</label>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              required
              placeholder="Ingresa tu respuesta"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Verificar Respuesta'}
          </button>
        </form>
      )}
      
      <div className="back-link">
        <button onClick={() => navigate('/login')}>
          ← Volver a inicio de sesión
        </button>
      </div>
    </div>
  );
};

export default RecoveryForm;