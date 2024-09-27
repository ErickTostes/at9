import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Profile.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/users/1') 
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('email', data.email);
      });
  }, [setValue]);

  const onSubmit = (data) => {
    fetch('https://dummyjson.com/users/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        toast.success('Informações atualizadas com sucesso!');
        setUser(updatedUser);
      })
      .catch(() => toast.error('Erro ao atualizar informações.'));
  };

  return (
    <div className="profile-container">
      <h1>Perfil de Usuário</h1>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <div className="form-group">
            <label>Primeiro Nome</label>
            <input type="text" {...register('firstName', { required: true })} />
            {errors.firstName && <p>Primeiro nome é obrigatório</p>}
          </div>

          <div className="form-group">
            <label>Último Nome</label>
            <input type="text" {...register('lastName', { required: true })} />
            {errors.lastName && <p>Último nome é obrigatório</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register('email', { required: true })} />
            {errors.email && <p>Email é obrigatório</p>}
          </div>

          <button type="submit">Atualizar Informações</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
