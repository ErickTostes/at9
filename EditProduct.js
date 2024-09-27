import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './EditProduct.css';

const EditProduct = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState({
    nome: '',
    descricao: '',
    preco: '',
    url_imagem: '',
    fornecedor: ''
  });
  const navigate = useNavigate();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzNjVkIiwiaWF0IjoxNzI2ODY0NTQ4fQ.oQ6vlVpQEHwsq82736fY9I_OlXXBDyWYQoatf3rr6uk';

  useEffect(() => {
    fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${_id}`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [_id]);

  const handleChange = (value) => {
    setProduct((prev) => ({ ...prev, descricao: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(product),
    }).then(() => {
      navigate('/home');
    });
  };

  return (
    <div className="edit-product-container">
      <h1>Editar Produto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={product.nome} onChange={(e) => setProduct({ ...product, nome: e.target.value })} required />
        </label>
        <label>
          Descrição:
          <ReactQuill 
            value={product.descricao} 
            onChange={handleChange} 
            required 
            theme="snow" 
          />
        </label>
        <label>
          Preço:
          <input type="number" name="preco" value={product.preco} onChange={(e) => setProduct({ ...product, preco: e.target.value })} required />
        </label>
        <label>
          URL da Imagem:
          <input type="text" name="url_imagem" value={product.url_imagem} onChange={(e) => setProduct({ ...product, url_imagem: e.target.value })} required />
        </label>
        <label>
          Fornecedor:
          <input type="text" name="fornecedor" value={product.fornecedor} onChange={(e) => setProduct({ ...product, fornecedor: e.target.value })} required />
        </label>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate('/home')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditProduct;
