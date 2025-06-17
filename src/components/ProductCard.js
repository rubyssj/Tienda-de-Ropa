import React from 'react';

const ProductCard = ({ product, onProductSelect }) => {
  // Función para obtener la etiqueta del género
  const getGenderLabel = (gender) => {
    if (!gender) return '';
    
    switch(gender) {
      case 'mujer':
        return 'Mujer';
      case 'hombre':
        return 'Hombre';
      case 'niños':
        return 'Niños';
      default:
        return '';
    }
  };

  // Función para obtener el color de fondo de la etiqueta
  const getGenderBadgeColor = (gender) => {
    if (!gender) return 'bg-gray-100 text-gray-800';
    
    switch(gender) {
      case 'mujer':
        return 'bg-pink-100 text-pink-800';
      case 'hombre':
        return 'bg-blue-100 text-blue-800';
      case 'niños':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Manejar clic en el botón "Ver Detalles"
  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Simplemente llamar a la función de selección del producto
    onProductSelect(product);
  };

  // Obtener la imagen del producto
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : (product.image || 'producto.jpg');

  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-64 bg-gray-100 flex items-center justify-center relative">
        <span className="text-gray-400">Imagen: {productImage}</span>
        
        {product.gender && (
          <div className="absolute top-2 left-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getGenderBadgeColor(product.gender)}`}>
              {getGenderLabel(product.gender)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description || 'Sin descripción disponible'}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">${product.price?.toFixed(2) || '0.00'}</span>
          <button 
            onClick={handleViewDetails}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            style={{ cursor: 'pointer' }}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;