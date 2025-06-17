import React, { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';

const JoinUsPage = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    cv: null
  });
  
  const [submitStatus, setSubmitStatus] = useState(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const formRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        cv: file
      });
      setFileName(file.name);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Cambiar estado a enviando
    setSubmitStatus('sending');
    
    // Crear objeto para enviar a EmailJS
    const templateParams = {
      to_email: 'rubenroa973299@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      position: formData.position,
      experience: formData.experience,
      message: formData.message,
      file_name: fileName || 'No se adjuntó CV'
    };

    // Descomentar este bloque para activar el envío real de emails
    emailjs.send(
      'service_jkqrunz',  // Service ID de EmailJS
      'template_sqn7e22', // Template ID de EmailJS
      templateParams,
      'rZS0A83MO09MJs-wY'  // Public Key (User ID) de EmailJS
    )
      .then((result) => {
        console.log('Email enviado!', result.text);
        setSubmitStatus('success');
        resetForm();
      })
      .catch((error) => {
        console.error('Error al enviar email:', error);
        setSubmitStatus('error');
      });
    
    // Comentar esta simulación cuando se active el código real de EmailJS
    // setTimeout(() => {
    //   console.log('Enviando email a:', templateParams.to_email);
    //   console.log('Datos del formulario:', templateParams);
    //   
    //   setSubmitStatus('success');
    //   resetForm();
    // }, 1500);
  };
  
  const resetForm = () => {
    // Resetear el formulario después de enviar
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: '',
      cv: null
    });
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Después de 3 segundos, volver al estado inicial
    setTimeout(() => {
      setSubmitStatus(null);
    }, 3000);
  };
  
  // Renderizar diferentes estados del formulario
  const renderFormStatus = () => {
    switch(submitStatus) {
      case 'success':
        return (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg text-center">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 className="text-lg font-medium">¡Aplicación enviada con éxito!</h4>
            <p className="mt-2">Gracias por tu interés en formar parte de nuestro equipo. Tu información ha sido enviada a rubenroa973299@gmail.com y nos pondremos en contacto contigo pronto.</p>
          </div>
        );
      case 'error':
        return (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-6 rounded-lg text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h4 className="text-lg font-medium">Error al enviar la aplicación</h4>
            <p className="mt-2">Lo sentimos, ha ocurrido un problema al enviar tu información. Por favor, intenta nuevamente o contáctanos directamente por correo electrónico.</p>
            <button
              onClick={() => setSubmitStatus(null)} 
              className="mt-4 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        );
      default:
        return (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                placeholder="+595 xxx xxx xxx"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puesto de interés*</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
              >
                <option value="" className="text-gray-500">Selecciona un puesto</option>
                <option value="ventas" className="text-black">Ventas</option>
                <option value="marketing" className="text-black">Marketing</option>
                <option value="diseño" className="text-black">Diseño</option>
                <option value="atención al cliente" className="text-black">Atención al cliente</option>
                <option value="logística" className="text-black">Logística</option>
                <option value="tecnología" className="text-black">Tecnología</option>
                <option value="otros" className="text-black">Otros</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Años de experiencia*</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white"
              >
                <option value="" className="text-gray-500">Selecciona tu experiencia</option>
                <option value="0-1" className="text-black">Menos de 1 año</option>
                <option value="1-3" className="text-black">1-3 años</option>
                <option value="3-5" className="text-black">3-5 años</option>
                <option value="5+" className="text-black">Más de 5 años</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje (opcional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                placeholder="Por qué te gustaría unirte a nuestro equipo..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sube tu CV (PDF)*</label>
              <div className="relative">
                <input
                  type="file"
                  name="cv"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
                />
                {fileName && (
                  <div className="mt-2 text-sm text-black">
                    Archivo seleccionado: <span className="font-medium">{fileName}</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">Formato PDF, máximo 5MB</p>
            </div>
            
            <div className="mt-2 text-sm text-gray-700">
              <p>Este formulario enviará tus datos a: <span className="font-medium">rubenroa973299@gmail.com</span></p>
            </div>
            
            <button
              type="submit"
              className={`w-full py-3 rounded-lg transition-colors ${
                submitStatus === 'sending'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              disabled={submitStatus === 'sending'}
            >
              {submitStatus === 'sending' ? 'Enviando...' : 'Enviar aplicación'}
            </button>
          </form>
        );
    }
  };
  
  useEffect(() => {
    // Bloquear el scroll cuando se abre el modal
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      // Restaurar el scroll cuando se cierra
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-black">Trabaja con nosotros</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">
            En Rubyshop estamos en constante crecimiento y siempre buscamos talento para unirse a nuestro equipo. 
            Si te apasiona la moda y quieres desarrollar tu carrera en un ambiente dinámico e innovador. 
            Atte: Ruben
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">Formulario de aplicación</h3>
            {renderFormStatus()}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">Nuestra ubicación</h3>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Nuestra oficina central está ubicada en:
              </p>
              <p className="font-medium text-black">
                Paralela Sur Casi Brasilia<br />
                111003 Mariano Roque Alonso, Paraguay<br />
                Tel: +595 981 315 606
              </p>
            </div>
            
            <div className="h-80 bg-gray-100 rounded-lg overflow-hidden">
              {/* Google Maps iframe con coordenadas exactas */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6478889832724!2d-57.541309925582125!3d-25.187000000000068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdfd51ae1192e976e!2zMjXCsDExJzEzLjIiUyA1N8KwMzInMTguNyJX!5e0!3m2!1ses!2spy!4v1717351698868!5m2!1ses!2spy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación exacta de Rubyshop en Mariano Roque Alonso, Paraguay"
              ></iframe>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-black">Horario de atención:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Lunes a Viernes: 9:00 - 18:00</li>
                <li>Sábados: 09:00 - 12:00</li>
                <li>Domingos y festivos: Cerrado</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Para más información, puedes contactarnos en <a href="mailto:rubenroa973299@gmail.com" className="text-black hover:underline">rubenroa973299@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage; 