import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { toast } from 'react-toastify';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userExists = registeredUsers.find((user) => user.email === data.email);
  
    if (userExists) {
      toast.error('Usuário já registrado com este email.');
      return;
    }
  
    registeredUsers.push(data);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  
    setTimeout(() => {
      toast.success('Usuário registrado com sucesso');
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="register-container">
      <h1>{isRegistered ? 'Login' : 'Registrar-se'}</h1>

      {!isRegistered ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Nome</label>
            <input 
              type="text" 
              {...register('name', { required: true })}
            />
            {errors.name && <p>Nome é obrigatório</p>}
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              {...register('email', { 
                required: true, 
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ 
              })}
            />
            {errors.email && <p>Email inválido</p>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && <p>A senha deve ter no mínimo 6 caracteres</p>}
          </div>

          <button type="submit">Registrar</button>
          <p>
            Já possui uma conta? 
            <span onClick={() => setIsRegistered(true)} className="link"> Faça Login</span>
          </p>
        </form>
      ) : (
        <div>
          <h2>Login</h2>
          <p>
            Para fazer login, insira suas credenciais.
          </p>
          <button onClick={() => navigate('/login')}>Ir para Login</button>
        </div>
      )}
    </div>
  );
};

export default Register;