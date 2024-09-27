import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import DeleteModal from './DeleteModal';

const Home = ({ setIsAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const response = await fetch('https://api-infnet-produtos-privado.vercel.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@admin.com',
          password: '123456',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        fetchProducts(data.token);
      }
    };

    const fetchProducts = async (token) => {
      const response = await fetch('https://api-infnet-produtos-privado.vercel.app/produtos', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
      }
    };

    authenticate();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToFavorites = () => {
    navigate('/favorites');
  };

  const toggleFavorite = (productId) => {
    let updatedFavorites;
    if (favorites.includes(productId)) {
      updatedFavorites = favorites.filter(id => id !== productId);
    } else {
      updatedFavorites = [...favorites, productId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${productToDelete}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    setProducts(products.filter(product => product._id !== productToDelete));
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <h1>Catálogo de Produtos</h1>
      <div className="home-buttons">
        <button onClick={goToProfile}>Perfil</button>
        <button onClick={goToFavorites}>Favoritos</button>
        <button onClick={handleLogout}>Sair</button>
        <button onClick={toggleViewMode}>
          Mudar para {viewMode === 'grid' ? 'Lista' : 'Grade'}
        </button>
        <button onClick={() => navigate('/create-product')}>Criar Produto</button>
      </div>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className={`products-container ${viewMode}`}>
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.url_imagem} alt={product.nome} className="product-image" />
            <h3>{product.nome}</h3>
            <p>{product.descricao}</p>
            <p><strong>Preço:</strong> ${product.preco}</p>
            <button onClick={() => toggleFavorite(product._id)}>
              {favorites.includes(product._id) ? 'Desmarcar Favorito' : 'Marcar como Favorito'}
            </button>
            <button onClick={() => navigate(`/products/${product._id}`)}>Ver Detalhes</button>
            <button onClick={() => openDeleteModal(product._id)}>Excluir</button>
          </div>
        ))}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Home;
