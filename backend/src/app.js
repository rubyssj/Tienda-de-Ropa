const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

// Importar modelos
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');

// Datos en memoria (como respaldo si no hay conexión a MongoDB)
const productsData = {
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
    },
    {
      id: 8,
      name: "Sudadera con Capucha",
      price: 45.99,
      image: "sudadera-capucha.jpg",
      description: "Sudadera con capucha y bolsillo canguro, confeccionada en mezcla de algodón premium. Ideal para días frescos y actividades al aire libre.",
      availableSizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Negro", "Gris jaspeado", "Azul marino", "Burdeos"],
      material: "Algodón y poliéster (80/20)",
      rating: 4.8,
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
    },
    {
      id: 5,
      name: "Pantalón Formal",
      price: 45.99,
      image: "formal.jpg",
      description: "Pantalón formal de corte recto, ideal para entornos profesionales. Confeccionado con tela resistente y cómoda.",
      availableSizes: ["M", "L", "XL"],
      colors: ["Negro", "Gris", "Azul marino"],
      material: "Lana y poliéster",
      rating: 4.2,
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
    },
    {
      id: 6,
      name: "Zapatillas Deportivas",
      price: 69.99,
      image: "deportivas.jpg",
      description: "Zapatillas ligeras y ergonómicas, ideales para actividades deportivas o uso diario. Máxima comodidad garantizada.",
      availableSizes: ["37", "38", "41", "42", "43"],
      colors: ["Blanco/Negro", "Negro/Rojo", "Azul/Blanco"],
      material: "Malla transpirable y suela de goma",
      rating: 4.7,
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
    }
  ]
};

// Inicializar app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de productos
app.get('/api/products', async (req, res) => {
  try {
    const { category, gender, search } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (gender) {
      query.gender = gender;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Importar rutas de usuario
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Rutas de usuarios (estas se reemplazarán por las rutas importadas)
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: 'token_jwt_aqui' // Aquí deberías generar un token JWT real
      });
    } else {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    const user = await User.create({
      name,
      email,
      password
    });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: 'token_jwt_aqui' // Aquí deberías generar un token JWT real
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de la tienda de ropa funcionando correctamente');
});

// Función para importar productos de prueba a la base de datos
const importProducts = async () => {
  try {
    // Comprobar si ya hay productos en la base de datos
    const count = await Product.countDocuments();
    
    // Verificar si la categoría 'traje' existe
    const categories = await Product.distinct('category');
    const hasSuitCategory = categories.includes('traje');
    
    // Si no hay productos o no existe la categoría 'traje', importar todos
    if (count === 0 || !hasSuitCategory) {
      console.log('Importando productos de prueba...');
      
      // Si ya hay productos pero falta la categoría traje, eliminar productos existentes
      if (count > 0 && !hasSuitCategory) {
        console.log('Actualizando productos para incluir nueva categoría...');
        await Product.deleteMany({});
      }
      
      // Convertir los datos de prueba a un formato adecuado para MongoDB
      const productsToImport = [];
      
      for (const category in productsData) {
        productsData[category].forEach(product => {
          // Eliminar el campo id ya que MongoDB usa _id
          const { id, ...productData } = product;
          productsToImport.push(productData);
        });
      }
      
      // Insertar los productos en la base de datos
      await Product.insertMany(productsToImport);
      console.log(`${productsToImport.length} productos importados correctamente`);
      
      // Verificar las categorías después de la importación
      const updatedCategories = await Product.distinct('category');
      console.log('Categorías disponibles después de importar:', updatedCategories);
    } else {
      console.log(`Ya existen ${count} productos en la base de datos con categorías: ${categories.join(', ')}`);
    }
  } catch (error) {
    console.error('Error al importar productos:', error);
  }
};

// Iniciar servidor y conectar a MongoDB
const PORT = process.env.PORT || 5000;

// Intentar conectar a MongoDB
connectDB()
  .then(connected => {
    if (connected) {
      // Si la conexión es exitosa, importar productos de prueba
      importProducts();
    }
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      if (!connected) {
        console.log('NOTA: Usando datos en memoria (sin conexión a MongoDB)');
      }
    });
  })
  .catch(error => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  });
