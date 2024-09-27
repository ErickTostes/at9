import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateProduct.css';

const CreateProduct = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedor, setFornecedor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('https://api-infnet-produtos-privado.vercel.app/fornecedores', {
          method: 'GET',
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzNjVkIiwiaWF0IjoxNzI2ODY0NTQ4fQ.oQ6vlVpQEHwsq82736fY9I_OlXXBDyWYQoatf3rr6uk`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFornecedores(data);
        } else {
          setError('Erro ao carregar fornecedores.');
        }
      } catch (error) {
        setError('Erro ao conectar com a API.');
      }
    };

    fetchFornecedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome || !preco || !descricao || !imagem || !fornecedor) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const newProduct = {
      nome,
      preco: parseFloat(preco),
      fornecedor,
      url_imagem: imagem,
      descricao,
    };

    try {
      const response = await fetch('https://api-infnet-produtos-privado.vercel.app/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzNjVkIiwiaWF0IjoxNzI2ODY0NTQ4fQ.oQ6vlVpQEHwsq82736fY9I_OlXXBDyWYQoatf3rr6uk`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setSuccess('Produto criado com sucesso!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao criar produto.');
      }
    } catch (error) {
      setError('Erro ao conectar com a API.');
    }
  };

  return (
    <div className="create-product-container">
      <h1>Criar Novo Produto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <select
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
          required
        >
          <option value="" disabled>Selecione um Fornecedor</option>
          {fornecedores.map((f) => (
            <option key={f._id} value={f._id}>{f.nome}</option>
          ))}
        </select>
        <ReactQuill
          value={descricao}
          onChange={setDescricao}
          placeholder="Descrição"
          required
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          required
        />
        <button type="submit">Criar Produto</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default CreateProduct;
