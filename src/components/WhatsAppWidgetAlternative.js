import React, { useEffect } from 'react';

const WhatsAppWidgetAlternative = () => {
  useEffect(() => {
    // Este enfoque inserta directamente el script y el div en el cuerpo del documento
    const scriptContent = `
      <!-- Elfsight WhatsApp Chat | Untitled WhatsApp Chat -->
      <script src="https://static.elfsight.com/platform/platform.js" async></script>
      <div class="elfsight-app-a49e61d9-4a8f-4257-98db-a7ef4d2a3641" data-elfsight-app-lazy></div>
    `;
    
    // Crear un elemento div para contener el widget
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'whatsapp-widget-container';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = '20px';
    widgetContainer.style.right = '20px';
    widgetContainer.style.zIndex = '9999';
    
    // Insertar el HTML con el script y el div del widget
    widgetContainer.innerHTML = scriptContent;
    
    // Añadir el contenedor al cuerpo del documento
    document.body.appendChild(widgetContainer);
    
    // Limpiar cuando el componente se desmonte
    return () => {
      if (document.querySelector('.whatsapp-widget-container')) {
        document.body.removeChild(widgetContainer);
      }
    };
  }, []);

  // Este componente no renderiza nada visible directamente
  return null;
};

export default WhatsAppWidgetAlternative; 