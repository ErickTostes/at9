import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import PasswordReset from './PasswordReset';
import Favorites from './Favorites';
import ProductDetails from './ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  return (
    <Router>
      <ToastContainer />
      <button onClick={toggleTheme} className="theme-toggle-button">Trocar Tema</button>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home setIsAuthenticated={setIsAuthenticated} />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<Profile />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/favorites"
          element={<PrivateRoute element={<Favorites />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/products/:_id"
          element={<PrivateRoute element={<ProductDetails />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/edit-product/:_id"
          element={<PrivateRoute element={<EditProduct />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/create-product"
          element={<PrivateRoute element={<CreateProduct />} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
