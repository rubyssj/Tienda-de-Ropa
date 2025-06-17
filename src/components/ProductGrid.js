import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ category, onProductSelect, searchResults }) => {
  const [selectedGender, setSelectedGender] = useState('todos');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendProducts, setBackendProducts] = useState([]);
  
  const isSearchMode = searchResults && searchResults.length > 0;
  
  // Cargar productos del backend cuando cambia la categoría
  useEffect(() => {
    const fetchProducts = async () => {
      if (isSearchMode) return; // No cargar del backend si hay resultados de búsqueda
      
      setLoading(true);
      setError(null);
      
      try {
        let url = 'http://localhost:5000/api/products';
        
        // Agregar parámetro de categoría si no es 'all'
        if (category && category !== 'all') {
          url += `?category=${category}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setBackendProducts(data.data);
        } else {
          setError('Error al cargar productos');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar productos del servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, isSearchMode]);
  
  // Obtenemos todos los productos a mostrar (resultados de búsqueda o productos del backend)
  const productsToFilter = isSearchMode ? searchResults : backendProducts;

  // Filtramos los productos por género cuando cambia la categoría, el género seleccionado o los resultados de búsqueda
  useEffect(() => {
    if (selectedGender === 'todos') {
      setFilteredProducts(productsToFilter);
    } else {
      const filtered = productsToFilter.filter(product => product.gender === selectedGender);
      setFilteredProducts(filtered);
    }
  }, [category, selectedGender, productsToFilter]);

  // Verificamos si existen productos para cada género en los resultados actuales
  const hasWomenProducts = productsToFilter.some(product => product.gender === 'mujer');
  const hasMenProducts = productsToFilter.some(product => product.gender === 'hombre');
  const hasKidsProducts = productsToFilter.some(product => product.gender === 'niños');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold capitalize mb-3 sm:mb-0">
          {isSearchMode ? 'Resultados de búsqueda' : category}
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedGender('todos')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedGender === 'todos'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          
          {hasWomenProducts && (
            <button
              onClick={() => setSelectedGender('mujer')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedGender === 'mujer'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Mujer
            </button>
          )}
          
          {hasMenProducts && (
            <button
              onClick={() => setSelectedGender('hombre')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedGender === 'hombre'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Hombre
            </button>
          )}
          
          {hasKidsProducts && (
            <button
              onClick={() => setSelectedGender('niños')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedGender === 'niños'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Niños
            </button>
          )}
        </div>
      </div>
      
      {isSearchMode && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700">
            Se encontraron <span className="font-semibold">{searchResults.length}</span> resultados
            {selectedGender !== 'todos' && (
              <span> - Mostrando <span className="font-semibold">{filteredProducts.length}</span> para <span className="font-semibold">{selectedGender}</span></span>
            )}
          </p>
        </div>
      )}
      
      {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product._id || `${product.category}-${product.id}`} 
              product={product} 
              onProductSelect={onProductSelect}
            />
        ))}
      </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-1">No hay productos disponibles</h3>
          <p className="text-gray-500">
            {isSearchMode 
              ? `No hay resultados de búsqueda ${selectedGender !== 'todos' ? `para ${selectedGender}` : ''}`
              : `No hay productos ${selectedGender !== 'todos' ? `para ${selectedGender}` : ''} en esta categoría.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;