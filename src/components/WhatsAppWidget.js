import React, { useEffect } from 'react';

const WhatsAppWidget = () => {
  useEffect(() => {
    // Cargar el script de Elfsight si aún no está cargado
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
    
    // Limpiar el script cuando el componente se desmonte
    return () => {
      const script = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
      if (script) {
        // En React es mejor no eliminar scripts cargados, ya que pueden ser usados por otros componentes
        // Pero sí podemos desactivar el widget si fuera necesario
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div 
        className="elfsight-app-a49e61d9-4a8f-4257-98db-a7ef4d2a3641" 
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default WhatsAppWidget; 