import React, { useState, useEffect } from 'react';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    size: '',
    color: ''
  });
  
  const [checkingStock, setCheckingStock] = useState(false);
  const [stockStatus, setStockStatus] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Asegurarse de que el producto tenga todas las propiedades necesarias
  useEffect(() => {
    console.log("ProductDetail - Producto recibido:", product);
    
    if (product) {
      console.log("ProductDetail - Detalles del producto:", {
        id: product.id,
        name: product.name,
        price: product.price,
        availableSizes: product.availableSizes,
        colors: product.colors
      });
      
      // Bloquear el scroll sin cambiar la posición visible de la página
      document.body.style.overflow = 'hidden';
    
      // Compensar el ancho de la barra de desplazamiento para evitar saltos
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    
    return () => {
      // Restaurar el scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [product]);
  
  // Si no hay producto, no mostrar nada
  if (!product) {
    console.log("ProductDetail - No hay producto para mostrar");
    return null;
  }
  
  // Usar las tallas disponibles del producto o un conjunto predeterminado
  const sizes = product?.availableSizes || ['XS', 'S', 'M', 'L', 'XL'];
  const colors = product?.colors || ['Negro', 'Blanco', 'Gris'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/34614597591?text=Hola, estoy interesado en ${product?.name || 'este producto'} talla ${formData.size}${formData.color ? ', color '+formData.color : ''}. Mi nombre es ${formData.name}. ${formData.message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Resetear el estado de stock cuando cambia la talla
    if (e.target.name === 'size') {
      setStockStatus(null);
      setAddedToCart(false);
    }
  };
  
  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color
    });
  };
  
  const checkAvailability = () => {
    if (!formData.size) return;
    
    setCheckingStock(true);
    
    // Simulación de verificación de stock
    setTimeout(() => {
      // Verificar si la talla está en las tallas disponibles
      const isAvailable = product?.availableSizes?.includes(formData.size) || true;
      setStockStatus(isAvailable ? 'available' : 'unavailable');
      setCheckingStock(false);
    }, 800);
  };
  
  const handleAddToCart = () => {
    if (formData.size && stockStatus === 'available' && onAddToCart) {
      onAddToCart(product, formData.size, formData.color);
      setAddedToCart(true);
      
      // Mostrar mensaje de confirmación por 2 segundos
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };
  
  // Renderizar estrellas para la valoración
  const renderStars = (rating) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="text-yellow-400">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };
  
  // Obtener etiqueta de género para mostrar
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
  
  // Obtener color de fondo para la etiqueta de género
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

  // Manejar el cierre del detalle del producto
  const handleClose = () => {
    // La limpieza del scroll se maneja en el useEffect
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overscrollBehavior: 'none',
        overflow: 'hidden'
      }}
         onClick={(e) => {
           if (e.target === e.currentTarget) {
             handleClose();
           }
         }}
    >
      <div 
        className="bg-white rounded-xl p-4 md:p-6 w-full max-w-lg mx-auto overflow-y-auto z-50" 
        style={{
          maxHeight: 'calc(100vh - 4rem)',
          margin: 'auto',
          transform: 'translateY(0)',
          paddingBottom: '1.5rem'
        }}
           onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl md:text-2xl font-bold">{product.name}</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        
        <div className="h-64 bg-gray-100 mb-6 rounded-lg flex items-center justify-center relative">
          <span className="text-gray-400">Imagen: {product.image || 'producto.jpg'}</span>
          
          {product.gender && (
            <div className="absolute top-3 left-3">
              <span className={`text-xs px-2 py-1 rounded-full ${getGenderBadgeColor(product.gender)}`}>
                {getGenderLabel(product.gender)}
              </span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-bold text-black">${product.price?.toFixed(2) || '0.00'}</p>
            <div className="flex items-center">
              {product.rating && (
                <>
                  <div className="flex mr-1">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </>
              )}
            </div>
          </div>
          <p className="text-gray-700 mb-3">{product.description || 'Sin descripción disponible'}</p>
          
          {product.material && (
            <div className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Material:</span> {product.material}
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Selecciona tu talla</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {sizes.map(size => (
              <button
                key={size}
                type="button"
                className={`w-12 h-12 flex items-center justify-center border ${
                  formData.size === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-300 hover:border-gray-500'
                } rounded-md transition-colors`}
                onClick={() => handleChange({ target: { name: 'size', value: size } })}
              >
                {size}
              </button>
            ))}
          </div>
          
          {colors && colors.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Colores disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`px-3 py-2 border ${
                      formData.color === color
                        ? 'border-black bg-gray-100'
                        : 'border-gray-300 hover:border-gray-500'
                    } rounded-md transition-colors text-sm`}
                    onClick={() => handleColorSelect(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={checkAvailability}
              disabled={!formData.size || checkingStock}
              className={`px-4 py-2 text-sm rounded-md ${
                !formData.size || checkingStock
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-black'
              }`}
            >
              {checkingStock ? 'Verificando...' : 'Verificar disponibilidad'}
            </button>
            
            {stockStatus && (
              <span className={`text-sm font-medium ${
                stockStatus === 'available' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stockStatus === 'available' 
                  ? '¡En stock!' 
                  : 'No disponible actualmente'}
              </span>
            )}
          </div>
          
          {/* Botón de añadir al carrito */}
          {stockStatus === 'available' && (
            <div className="mb-6">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full py-3 rounded-lg transition-colors ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {addedToCart ? '¡Añadido al carrito!' : 'Añadir al carrito'}
              </button>
            </div>
          )}
        </div>
        
        <div className="border-t pt-5">
          <h3 className="text-lg font-semibold mb-3">¿Tienes preguntas? Contáctanos</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea
              name="message"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              onChange={handleChange}
                placeholder="Escribe cualquier pregunta o detalle adicional..."
            ></textarea>
          </div>
          
          <button
            type="submit"
              disabled={!formData.size}
              className={`w-full py-3 rounded-lg transition-colors ${
                !formData.size
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
          >
            Contactar por WhatsApp
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;