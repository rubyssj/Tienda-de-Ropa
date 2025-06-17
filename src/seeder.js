const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Importar modelos
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tienda-ropa')
  .then(() => console.log('Conexión a MongoDB establecida para el seeder'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
  });

// Importar datos desde el frontend
const importData = async () => {
  try {
    // Leer datos de productos del frontend
    const productsData = fs.readFileSync(
      path.join(__dirname, '../../src/mock/products.js'),
      'utf-8'
    );
    
    // Extraer el objeto products del archivo
    const productsMatch = productsData.match(/export const products = ({[\s\S]*?});/);
    if (!productsMatch) {
      throw new Error('No se pudo encontrar el objeto products en el archivo');
    }
    
    // Evaluar el objeto products
    const productsObj = eval(`(${productsMatch[1]})`);
    
    // Preparar productos para MongoDB
    const products = [];
    for (const category in productsObj) {
      productsObj[category].forEach(product => {
        products.push({
          ...product,
          category
        });
      });
    }

    // Crear usuario administrador
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    // Limpiar datos existentes
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insertar usuario admin
    const createdAdmin = await adminUser.save();
    console.log('Usuario administrador creado');

    // Insertar productos
    await Product.insertMany(products);
    console.log(`${products.length} productos importados`);

    console.log('Datos importados correctamente');
    process.exit();
  } catch (error) {
    console.error(`Error en la importación: ${error.message}`);
    process.exit(1);
  }
};

// Eliminar todos los datos
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Datos eliminados correctamente');
    process.exit();
  } catch (error) {
    console.error(`Error al eliminar datos: ${error.message}`);
    process.exit(1);
  }
};

// Ejecutar función según argumentos
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 