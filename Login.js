import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      toast.error('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://api-infnet-produtos-privado.vercel.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas.');
      }

      const data = await response.json();
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', data.token); // Armazena o token no localStorage
      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
        <p>
          <span onClick={() => navigate('/password-reset')} className="link">Esqueceu a senha?</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
