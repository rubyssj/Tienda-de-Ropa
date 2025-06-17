import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import ShopHeader from './components/ShopHeader';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ProductDetail from './components/ProductDetail';
import ProductGrid from './components/ProductGrid';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  
  // Verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Función para manejar cambios de categoría
  const handleCategoryChange = (category) => {
    console.log("Categoría seleccionada:", category);
    setSelectedCategory(category);
    setSelectedProduct(null); // Limpiar producto seleccionado al cambiar categoría
    setSearchResults([]); // Limpiar resultados de búsqueda al cambiar categoría
  };

  // Función para manejar la selección de productos
  const handleProductSelect = (product) => {
    console.log("Producto seleccionado:", product);
    setSelectedProduct(product);
  };

  // Función para manejar búsqueda de productos
  const handleProductSearch = (product) => {
    console.log("Producto buscado:", product);
    if (product && !Array.isArray(product)) {
      // Si se selecciona un producto específico de la búsqueda
      setSelectedProduct(product);
      setSearchResults([]);
    } else if (Array.isArray(product)) {
      // Si se devuelve un array de resultados de búsqueda
      setSearchResults(product);
      setSelectedProduct(null);
      setSelectedCategory(null);
    }
  };

  // Función para cerrar el detalle del producto
  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  // Funciones para el carrito
  const handleAddToCart = (product, size, color) => {
    const cartId = Date.now().toString();
    const newItem = {
      ...product,
      selectedSize: size,
      selectedColor: color,
      cartId,
      quantity: 1
    };
    setCartItems([...cartItems, newItem]);
  };

  const handleRemoveCartItem = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };
  
  // Funciones para la autenticación
  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
  };
  
  // Componente para rutas protegidas
  const ProtectedRoute = ({ children, requireAdmin }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    if (requireAdmin && user.role !== 'admin') {
      return <Navigate to="/" />;
    }
    
    return children;
  };

  return (
    <Router>
    <div className="App">
      <ShopHeader 
          user={user}
          onLogout={handleLogout}
        onCategoryChange={handleCategoryChange}
        onProductSearch={handleProductSearch}
        cartItems={cartItems}
        onCartItemRemove={handleRemoveCartItem}
      />
        
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta principal */}
          <Route 
            path="/" 
            element={
              <main>
                {selectedCategory ? (
          <ProductGrid 
            category={selectedCategory}
            onProductSelect={handleProductSelect}
            searchResults={searchResults}
          />
        ) : searchResults.length > 0 ? (
          <ProductGrid 
            category="search"
            onProductSelect={handleProductSelect}
            searchResults={searchResults}
          />
        ) : (
          <HomePage 
            onProductSelect={handleProductSelect}
            onCategoryChange={handleCategoryChange}
          />
        )}
                
                {/* Renderizar el detalle del producto por encima del contenido existente */}
                {selectedProduct && (
                  <ProductDetail 
                    product={selectedProduct}
                    onAddToCart={handleAddToCart}
                    onClose={handleCloseProductDetail}
                  />
                )}
      </main>
            } 
          />
        </Routes>
        
      <Footer />
      <WhatsAppWidget />
    </div>
    </Router>
  );
};

export default App;

// DONE