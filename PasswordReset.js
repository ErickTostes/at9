import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';
import { toast } from 'react-toastify';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
  
    if (email.trim() === '') {
      toast.error('Por favor, insira seu email.');
      return;
    }
  
    toast.success(`Um link de redefinição de senha foi enviado para ${email}`);
    setEmail('');
  };

  return (
    <div className="password-reset-container">
      <h2>Recuperação de Senha</h2>
      <form onSubmit={handlePasswordReset}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="reset-button">Enviar Link de Redefinição</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        Já possui uma conta? <span onClick={() => navigate('/login')} className="link">Faça Login</span>
      </p>
    </div>
  );
};

export default PasswordReset;
