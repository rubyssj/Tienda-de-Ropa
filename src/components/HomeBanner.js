import React from 'react';
import { products } from '../mock/products';

const HomeBanner = ({ onProductSelect }) => {
  // Obtener productos destacados de cada categoría
  const getFeaturedProducts = () => {
    const featured = [];
    
    // Obtener algunos productos destacados de diferentes categorías
    if (products.traje && products.traje.length > 0) {
      featured.push(products.traje[0]); // Traje de Sastre Clásico
    }
    
    if (products.prendas && products.prendas.length > 0) {
      featured.push(products.prendas[1]); // Vestido Negro
    }
    
    if (products.zapatos && products.zapatos.length > 0) {
      featured.push(products.zapatos[0]); // Zapatos Casuales
    }
    
    return featured;
  };
  
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="bg-white">
      {/* Banner principal mejorado */}
      <div className="relative overflow-hidden bg-black text-white" style={{ position: 'relative', zIndex: 0 }}>
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-cyan-500 to-blue-500 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>
        </div>
        
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://via.placeholder.com/1920x1080?text=Banner+Tienda" 
            alt="Banner Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Conocé lo nuevo que tenemos para 
              <span className="relative inline-block ml-2">
                usted
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></span>
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Descubrí nuestra exclusiva colección que combina estilo, calidad y las últimas tendencias de la moda para expresar tu personalidad con cada prenda.
            </p>
            <a 
              href="#new-collection" 
              className="inline-block bg-white text-black font-medium px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors relative overflow-hidden group"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('new-collection');
                if (element) {
                  const headerOffset = 70; // Altura aproximada del header
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <span className="relative z-10">Ver colección</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </div>
        </div>
        
        {/* Elementos decorativos animados */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-12 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,22.39,121.09,43.79,201.9,55.13,229.24,59.18,260.59,57.06,292.42,57.63,303.9,57.84,317.31,58.6,321.39,56.44Z" 
                  fill="#ffffff">
            </path>
          </svg>
        </div>
      </div>

      {/* Nueva colección */}
      <div id="new-collection" className="container mx-auto px-4 py-20 scroll-mt-20">
        <div className="text-center mb-16 pt-4">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            Nueva Colección
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Diseños exclusivos que combinan elegancia y confort para todos los momentos importantes de tu vida.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={`${product.category}-${product.id}`} 
              className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              onClick={(e) => {
                e.preventDefault();
                onProductSelect(product);
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={`https://via.placeholder.com/400x500?text=${product.name}`} 
                  alt={product.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onProductSelect(product);
                    }}
                  >
                    Ver detalles
                  </button>
                </div>
                <div className="absolute top-4 right-4">
                  {product.category === 'traje' && (
                    <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Exclusivo
                    </span>
                  )}
                  {product.category === 'prendas' && (
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Destacado
                    </span>
                  )}
                  {product.category === 'zapatos' && (
                    <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Nuevo
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <p className="text-gray-700 line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner de características */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-pink-500 hover:transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Calidad Premium</h3>
            <p className="text-gray-600">Seleccionamos cuidadosamente cada material para ofrecerte prendas duraderas y cómodas.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500 hover:transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Envío Gratuito</h3>
            <p className="text-gray-600">En todos tus pedidos superiores a $100, para que disfrutes de tu compra sin costos adicionales.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-cyan-500 hover:transform hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Garantía de Devolución</h3>
            <p className="text-gray-600">30 días para cambios o devoluciones si no quedas satisfecho con tu compra.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner; 