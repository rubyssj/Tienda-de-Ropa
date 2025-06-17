import React from 'react';

// Componente CollectionSlider mejorado con estilo blanco y negro y detalles de color
const CollectionSlider = ({ products, onProductSelect }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // Asegurarse de que hay productos disponibles
  if (!products || products.length === 0) {
    return <div className="text-center py-4">No hay productos disponibles</div>;
  }
  
  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= products.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Función para ir al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? products.length - 1 : prevIndex - 1
    );
  };
  
  // Obtener el producto actual
  const currentProduct = products[currentIndex];
  
  return (
    <div className="flex flex-col items-center">
      {/* Producto actual */}
      <div className="relative w-full max-w-4xl mx-auto mb-12">
        <div className="px-4">
          <div 
            className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
            onClick={() => onProductSelect(currentProduct)}
          >
            <div className="relative">
              <img 
                src={`https://via.placeholder.com/600x800?text=${currentProduct.name}`} 
                alt={currentProduct.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4">
                <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentProduct.gender === 'hombre' ? 'Caballero' : 
                   currentProduct.gender === 'mujer' ? 'Dama' : 'Infantil'}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button 
                  className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors w-full font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onProductSelect(currentProduct);
                  }}
                >
                  Ver detalles
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{currentProduct.name}</h3>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(currentProduct.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">({(currentProduct.rating || 4.5).toFixed(1)})</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-black mb-0">${currentProduct.price.toFixed(2)}</p>
                <div className="flex space-x-2">
                  {currentProduct.availableColors && currentProduct.availableColors.slice(0, 3).map((color, index) => (
                    <span 
                      key={index} 
                      className="w-5 h-5 rounded-full border border-gray-300" 
                      style={{ 
                        backgroundColor: 
                          color.toLowerCase() === 'negro' ? 'black' : 
                          color.toLowerCase() === 'blanco' ? 'white' : 
                          color.toLowerCase() === 'gris' ? 'gray' : 
                          color.toLowerCase() === 'azul' ? 'blue' : 
                          color.toLowerCase() === 'rojo' ? 'red' : '#ddd'
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {currentProduct.availableSizes && currentProduct.availableSizes.slice(0, 5).map((size, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Flechas de navegación */}
        <button 
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-black hover:bg-gray-800 p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-pink-500 group"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></span>
        </button>
        
        <button 
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-black hover:bg-gray-800 p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 group"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></span>
        </button>
      </div>
      
      {/* Indicadores mejorados */}
      <div className="flex space-x-3 mb-4">
        {products.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ver producto ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Miniaturas de productos */}
      <div className="hidden md:flex justify-center space-x-4 mt-4">
        {products.map((product, index) => (
          <div 
            key={index}
            className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              index === currentIndex 
                ? 'ring-2 ring-offset-2 ring-black scale-110' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img 
              src={`https://via.placeholder.com/100x100?text=${product.name.split(' ')[0]}`}
              alt={`Miniatura ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionSlider;