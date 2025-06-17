const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuración de dotenv
dotenv.config();

// Datos en memoria (simulación de base de datos)
const products = {
  clothes: [
    {
      id: 1,
      name: "Blusa Elegante",
      price: 29.99,
      image: "blusa.jpg",
      description: "Blusa de seda con detalles florales, perfecta para ocasiones formales o casuales elegantes. Tejido ligero y transpirable.",
      availableSizes: ["S", "M", "L"],
      colors: ["Blanco", "Negro", "Azul marino"],
      material: "Seda y algodón (70/30)",
      rating: 4.5,
      gender: "mujer",
      category: "clothes"
    },
    {
      id: 2,
      name: "Vestido Negro",
      price: 49.99,
      image: "vestido.jpg",
      description: "Vestido clásico para ocasiones especiales con corte elegante y acabados de alta calidad. Ideal para eventos nocturnos.",
      availableSizes: ["XS", "S", "M", "XL"],
      colors: ["Negro", "Rojo", "Verde esmeralda"],
      material: "Poliéster elastizado",
      rating: 4.7,
      gender: "mujer",
      category: "clothes"
    },
    {
      id: 7,
      name: "Sudadera Básica",
      price: 34.99,
      image: "sudadera-basica.jpg",
      description: "Sudadera de algodón con interior afelpado, diseño minimalista y corte relajado. Perfecta para el día a día y momentos de relax.",
      availableSizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Gris", "Negro", "Azul", "Rojo"],
      material: "Algodón 100%",
      rating: 4.3,
      gender: "hombre",
      category: "clothes"
    }
  ],
  pants: [
    {
      id: 3,
      name: "Jeans Slim Fit",
      price: 39.99,
      image: "jeans.jpg",
      description: "Jeans ajustados de alta calidad con elasticidad para mayor comodidad. Diseño moderno y versátil para cualquier ocasión.",
      availableSizes: ["S", "M", "L", "XL"],
      colors: ["Azul medio", "Azul oscuro", "Negro"],
      material: "Denim elastizado",
      rating: 4.5,
      gender: "hombre",
      category: "pants"
    }
  ],
  shoes: [
    {
      id: 4,
      name: "Zapatos Casuales",
      price: 59.99,
      image: "zapatos.jpg",
      description: "Zapatos cómodos para el día a día con suela antideslizante y materiales de primera calidad. Diseño versátil.",
      availableSizes: ["38", "39", "40", "42"],
      colors: ["Marrón", "Negro", "Camel"],
      material: "Cuero sintético",
      rating: 4.3,
      gender: "hombre",
      category: "shoes"
    }
  ],
  traje: [
    {
      id: 19,
      name: "Traje de Sastre Clásico",
      price: 199.99,
      image: "traje-sastre.jpg",
      description: "Traje de sastre clásico con corte italiano, elaborado con telas de primera calidad. Incluye chaqueta y pantalón a juego. Ideal para ocasiones formales y entornos corporativos.",
      availableSizes: ["48", "50", "52", "54", "56"],
      colors: ["Negro", "Azul marino", "Gris oscuro", "Gris claro"],
      material: "Lana 100% de alta calidad",
      rating: 4.8,
      gender: "hombre",
      category: "traje"
    },
    {
      id: 20,
      name: "Traje de Casamiento Premium",
      price: 349.99,
      image: "traje-casamiento.jpg",
      description: "Elegante traje para casamiento con acabados premium y diseño contemporáneo. Confeccionado con los mejores materiales para garantizar distinción y elegancia en el día más especial.",
      availableSizes: ["48", "50", "52", "54"],
      colors: ["Blanco", "Negro", "Azul marino", "Beige"],
      material: "Lana virgen y seda (80/20)",
      rating: 4.9,
      gender: "hombre",
      category: "traje"
    },
    {
      id: 21,
      name: "Traje Slim Fit Ejecutivo",
      price: 249.99,
      image: "traje-slim.jpg",
      description: "Traje de corte slim fit con diseño moderno y elegante para el hombre ejecutivo. Confección impecable con detalles sofisticados que realzan su presencia profesional.",
      availableSizes: ["46", "48", "50", "52", "54"],
      colors: ["Azul marino", "Gris", "Negro", "Azul royal"],
      material: "Lana y elastano (98/2)",
      rating: 4.7,
      gender: "hombre",
      category: "traje"
    },
    {
      id: 22,
      name: "Traje Formal Femenino",
      price: 189.99,
      image: "traje-mujer.jpg",
      description: "Traje formal femenino de corte moderno con pantalón y blazer estructurado. Diseño elegante y sofisticado para entornos profesionales o eventos formales.",
      availableSizes: ["36", "38", "40", "42", "44"],
      colors: ["Negro", "Gris", "Blanco", "Azul marino"],
      material: "Poliéster premium y viscosa",
      rating: 4.6,
      gender: "mujer",
      category: "traje"
    },
    {
      id: 23,
      name: "Traje Infantil para Ceremonias",
      price: 89.99,
      image: "traje-infantil.jpg",
      description: "Traje infantil elegante para ceremonias y ocasiones especiales. Confeccionado con materiales de calidad y cuidadosos acabados para el confort del niño.",
      availableSizes: ["4", "6", "8", "10", "12"],
      colors: ["Azul marino", "Negro", "Gris"],
      material: "Poliéster y algodón",
      rating: 4.5,
      gender: "niños",
      category: "traje"
    }
  ]
};

// Convertir el objeto de productos en un array plano
let productsList = [];
for (const category in products) {
  products[category].forEach(product => {
    productsList.push(product);
  });
}

// Inicializar app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de productos
app.get('/api/products', (req, res) => {
  const { category, gender, search } = req.query;
  let filteredProducts = [...productsList];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (gender) {
    filteredProducts = filteredProducts.filter(p => p.gender === gender);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filteredProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = productsList.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de la tienda de ropa funcionando correctamente (versión simplificada)');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Se cargaron ${productsList.length} productos desde memoria`);
}); 