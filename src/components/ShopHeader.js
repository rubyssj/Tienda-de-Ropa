import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../mock/products';

const ShopHeader = ({ 
  onCategoryChange, 
  onProductSearch, 
  cartItems = [], 
  onCartItemRemove,
  user,
  onLogout
}) => {
  // Estados del componente
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Referencias para detectar clics fuera
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);

  // Categorías de navegación
  const categories = [
    { key: 'all', label: 'Todos los productos' },
    { key: 'prendas', label: 'Prendas' },
    { key: 'pantalones', label: 'Pantalones' },
    { key: 'zapatos', label: 'Calzados' },
    { key: 'traje', label: 'Trajes' },
    { key: 'accesorios', label: 'Accesorios' }
  ];

  // Manejo de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length < 2) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }
    
    const termLower = term.toLowerCase();
    const results = [];
    
    Object.keys(products).forEach(category => {
      products[category].forEach(product => {
        const nameStartsWithTerm = product.name.toLowerCase().startsWith(termLower);
        const nameContainsWordStartingWithTerm = product.name.toLowerCase()
          .split(' ').some(word => word.startsWith(termLower));
        
        if (nameStartsWithTerm || nameContainsWordStartingWithTerm) {
          results.push({...product, category});
        }
      });
    });
    
    // Ordenar resultados
    results.sort((a, b) => {
      const aStartsWithTerm = a.name.toLowerCase().startsWith(termLower);
      const bStartsWithTerm = b.name.toLowerCase().startsWith(termLower);
      
      if (aStartsWithTerm && !bStartsWithTerm) return -1;
      if (!aStartsWithTerm && bStartsWithTerm) return 1;
      return 0;
    });
    
    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Manejo de clic en resultado de búsqueda
  const handleResultClick = (product) => {
    const enrichedProduct = {
      ...product,
      availableSizes: product.availableSizes || ['XS', 'S', 'M', 'L', 'XL'],
      colors: product.colors || ['Negro', 'Blanco', 'Gris']
    };
    
    if (onProductSearch) {
      onProductSearch(enrichedProduct);
      setShowSearchResults(false);
      setSearchTerm('');
      setShowMobileSearch(false);
    }
  };

  // Manejo de envío de formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      onProductSearch(searchResults);
      setShowSearchResults(false);
        setSearchTerm('');
      setShowMobileSearch(false);
    }
  };

  // Mostrar todos los resultados
  const handleShowAllResults = () => {
    if (onProductSearch && searchResults.length > 0) {
      onProductSearch(null, searchResults);
      setShowSearchResults(false);
      setShowMobileSearch(false);
    }
  };

  // Manejo de clics fuera de los dropdowns
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowSearchResults(false);
    }
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      setShowCartDropdown(false);
    }
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cálculos del carrito
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Manejo de categorías
  const handleCategoryClick = (category) => {
    setIsMenuOpen(false);
    onCategoryChange(category);
  };

  // Componente de icono de búsqueda
  const SearchIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  // Componente de icono de carrito
  const CartIcon = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
  
  // Componente de icono de usuario
  const UserIcon = ({ className = "h-6 w-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  // Componente de icono de menú hamburguesa
  const MenuIcon = ({ isOpen, className = "h-6 w-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );

  // Componente de resultados de búsqueda
  const SearchResults = ({ isMobile = false }) => (
    showSearchResults && searchResults.length > 0 && (
      <div className={`absolute z-50 mt-1 w-full bg-white shadow-xl rounded-lg border border-gray-200 max-h-96 overflow-y-auto ${isMobile ? 'top-full' : ''}`}>
        <div className="p-3">
          <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
                </div>
                  
                  {searchResults.slice(0, 5).map((product) => (
                  <div 
                    key={`${product.category}-${product.id}`}
              className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      onClick={() => handleResultClick(product)}
                  >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">IMG</span>
                        </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                  <div className="text-sm text-indigo-600 font-semibold">${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                  </div>
                ))}
                  
                {searchResults.length > 5 && (
                    <button 
                      onClick={handleShowAllResults}
              className="w-full mt-3 text-center py-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    >
                      Ver todos los resultados ({searchResults.length})
                    </button>
                )}
              </div>
              </div>
    )
  );

  // Componente del dropdown del carrito
  const CartDropdown = () => (
    showCartDropdown && (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
          <h3 className="font-semibold text-gray-900">
            Tu carrito ({cartItemCount} artículo{cartItemCount !== 1 ? 's' : ''})
          </h3>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <CartIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
            <button 
              onClick={() => {
                setShowCartDropdown(false);
                setIsMenuOpen(false); // Cierra el menú móvil también
                if (onCategoryChange) onCategoryChange('all');
              }}
              className="text-sm bg-indigo-50 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Explorar productos
            </button>
            </div>
                ) : (
          <>
                    <div className="max-h-64 overflow-y-auto">
                      {cartItems.map((item) => (
                <div key={item.cartId} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                          <img
                      src={item.images?.[0] || '/placeholder-image.jpg'}
                            alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <div className="text-xs text-gray-500 mt-1">
                              {item.selectedSize} | {item.selectedColor}
              </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-gray-900">
                          ${item.price.toFixed(2)} x {item.quantity}
                              </span>
                  <button 
                          onClick={() => onCartItemRemove(item.cartId)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                  >
                                Eliminar
                  </button>
                      </div>
                </div>
                    </div>
                  </div>
                ))}
                    </div>
            
            <div className="p-4 bg-gray-50 rounded-b-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] transform">
                Finalizar compra
              </button>
            </div>
          </>
                )}
              </div>
    )
  );

  // Componente del dropdown del usuario
  const UserDropdown = () => (
    showUserMenu && user && (
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
        <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
        
        <Link
          to="/profile"
          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
          onClick={() => setShowUserMenu(false)}
        >
          Mi perfil
        </Link>
        
        {user.role === 'admin' && (
          <Link
            to="/admin"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
            onClick={() => setShowUserMenu(false)}
          >
            Panel de administración
          </Link>
        )}
        
        <button
          onClick={() => {
            onLogout();
            setShowUserMenu(false);
          }}
          className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    )
  );

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra principal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo y menú móvil */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
              aria-label="Menú"
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
            
            <Link 
              to="/" 
              onClick={() => {
                if (onCategoryChange) onCategoryChange(null);
                if (onProductSearch) onProductSearch(null);
                setSearchTerm('');
                setShowSearchResults(false);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2"
            >
              {/*<div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"></span>
              </div>*/}  
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hover:scale-110 transform duration-300 hover:from-purple-600 hover:to-indigo-600">
                Rubyshop
              </span>
            </Link>
          </div>

          {/* Barra de búsqueda (escritorio) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <SearchIcon />
              </button>
              <SearchResults />
            </form>
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-3">
            {/* Búsqueda móvil */}
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors hover:scale-110 transform duration-200"
              aria-label="Buscar"
            >
              <SearchIcon />
            </button>
            
            {/* Carrito */}
            <div className="relative" ref={cartRef}>
              <button 
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors relative hover:scale-110 transform duration-200"
                aria-label="Carrito"
              >
                <CartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>

            {/* Usuario */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors hover:scale-110 transform duration-200"
                aria-label="Usuario"
              >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium text-sm shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-colors hover:scale-110 transform duration-200"
                aria-label="Iniciar sesión"
              >
                <UserIcon />
              </Link>
              )}
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* Barra de búsqueda móvil */}
        {showMobileSearch && (
          <div className="lg:hidden pb-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:shadow-md"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <SearchIcon />
              </button>
              <SearchResults isMobile />
            </form>
          </div>
        )}

        {/* Navegación */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block border-t border-gray-200 lg:border-t-0`}>
          <div className="py-4 lg:py-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-8">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryClick(category.key)}
                  className="text-left lg:text-center py-2 lg:py-4 px-4 lg:px-0 text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group hover:scale-105 transform duration-200"
                >
                  {category.label}
                  <span className="absolute bottom-0 left-4 lg:left-0 right-4 lg:right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                </button>
              ))}
              </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;