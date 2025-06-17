import React, { useState, useEffect } from 'react';
import HomeBanner from './HomeBanner';
import CollectionSlider from './CollectionSlider';

const HomePage = ({ onProductSelect, onCategoryChange }) => {
  const [suitProducts, setSuitProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar productos de trajes del backend
  useEffect(() => {
    const fetchSuitProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:5000/api/products?category=traje');
        const data = await response.json();
        
        if (data.success) {
          setSuitProducts(data.data.slice(0, 4)); // Tomar solo los primeros 4 trajes
        } else {
          setError('Error al cargar los trajes');
        }
      } catch (error) {
        console.error('Error fetching suit products:', error);
        setError('Error al cargar los trajes del servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSuitProducts();
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Principal */}
      <HomeBanner onProductSelect={onProductSelect} />
      
      {/* Sección especial de Trajes */}
      <div className="bg-gray-50 py-16 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              Nuestra Colección de Trajes
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></span>
            </h2>
            <div className="flex justify-center items-center mb-4">
              <div className="bg-black h-0.5 w-16 mx-2"></div>
              <svg className="w-8 h-8 text-black animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="bg-black h-0.5 w-16 mx-2"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra exclusiva selección de trajes para ocasiones especiales. 
              Confeccionados con los mejores materiales y acabados impecables.
            </p>
          </div>
          
          {/* Estado de carga */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 rounded">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}
          
          {/* Slider de Trajes */}
          {!loading && !error && suitProducts.length > 0 && (
            <>
              <CollectionSlider products={suitProducts} onProductSelect={onProductSelect} />
              
              <div className="text-center mt-12">
                <button 
                  onClick={() => {
                    onCategoryChange('traje');
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }, 100);
                  }}
                  className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium
                    hover:bg-gray-900 hover:shadow-lg hover:scale-105
                    transition-all duration-300 ease-in-out w-full sm:w-auto
                    relative overflow-hidden group"
                >
                  <span className="relative z-10">Ver más</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Categorías principales */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4 relative inline-block mx-auto">
          Explora Nuestras Categorías
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></span>
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Descubre nuestra variedad de productos diseñados para cada ocasión y estilo
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="relative rounded-xl overflow-hidden h-96 cursor-pointer group"
            onClick={() => {
              onCategoryChange('prendas');
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }, 100);
            }}
          >
            <img 
              src="https://via.placeholder.com/400x500?text=Prendas" 
              alt="Prendas"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/30 flex items-end p-6 group-hover:from-black/90 transition-all duration-300">
              <div>
                <h3 className="text-white text-2xl font-bold mb-1">Prendas</h3>
                <p className="text-gray-200 mb-4">Encuentra tu estilo perfecto</p>
                <span className="inline-block bg-white text-black px-5 py-2 rounded-full font-medium group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300">
                  Explorar
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Nuevo
              </span>
            </div>
          </div>
          
          <div 
            className="relative rounded-xl overflow-hidden h-96 cursor-pointer group"
            onClick={() => {
              onCategoryChange('pantalones');
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }, 100);
            }}
          >
            <img 
              src="https://via.placeholder.com/400x500?text=Jeans" 
              alt="Jeans"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/30 flex items-end p-6 group-hover:from-black/90 transition-all duration-300">
              <div>
                <h3 className="text-white text-2xl font-bold mb-1">Jeans</h3>
                <p className="text-gray-200 mb-4">Comodidad para cada día</p>
                <span className="inline-block bg-white text-black px-5 py-2 rounded-full font-medium group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300">
                  Explorar
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Destacado
              </span>
            </div>
          </div>
          
          <div 
            className="relative rounded-xl overflow-hidden h-96 cursor-pointer group"
            onClick={() => {
              onCategoryChange('zapatos');
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }, 100);
            }}
          >
            <img 
              src="https://via.placeholder.com/400x500?text=Calzados" 
              alt="Calzados"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/30 flex items-end p-6 group-hover:from-black/90 transition-all duration-300">
              <div>
                <h3 className="text-white text-2xl font-bold mb-1">Calzados</h3>
                <p className="text-gray-200 mb-4">El paso perfecto para tu outfit</p>
                <span className="inline-block bg-white text-black px-5 py-2 rounded-full font-medium group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-300">
                  Explorar
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Popular
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Suscripción al newsletter */}
      <div className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Recibe las últimas novedades, tendencias y promociones exclusivas directamente en tu correo.
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-grow py-3 px-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button 
              type="submit"
              className="bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">Suscribirme</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </button>
          </form>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <span>Pagos Seguros</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <span>Envío Gratis</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <span>Devoluciones Fáciles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 