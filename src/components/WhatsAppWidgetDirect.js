import React, { useEffect } from 'react';

const WhatsAppWidgetDirect = () => {
  useEffect(() => {
    // Cargar el script de Elfsight
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // No eliminamos el script al desmontar para evitar problemas si otros componentes lo usan
    };
  }, []);

  return (
    <div 
      className="fixed bottom-4 right-4 z-50"
      dangerouslySetInnerHTML={{
        __html: '<div class="elfsight-app-a49e61d9-4a8f-4257-98db-a7ef4d2a3641" data-elfsight-app-lazy></div>'
      }}
    />
  );
};

export default WhatsAppWidgetDirect; 