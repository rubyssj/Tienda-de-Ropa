require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./backend/src/config/db');

async function checkDatabase() {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    // Obtener información de la conexión
    const connection = mongoose.connection;
    
    console.log('\n========== INFORMACIÓN DE CONEXIÓN ==========');
    console.log(`Host: ${connection.host}`);
    console.log(`Base de datos: ${connection.name || 'No especificada'}`);
    console.log(`Puerto: ${connection.port || 'Predeterminado'}`);
    console.log(`Usuario: ${connection.user || 'No especificado'}`);
    
    // Listar todas las colecciones disponibles
    const collections = await connection.db.listCollections().toArray();
    
    console.log('\n========== COLECCIONES DISPONIBLES ==========');
    if (collections.length > 0) {
      collections.forEach((collection, index) => {
        console.log(`${index + 1}. ${collection.name}`);
      });
    } else {
      console.log('No se encontraron colecciones en esta base de datos.');
    }
    
    // Listar todas las bases de datos disponibles
    const admin = connection.db.admin();
    const databases = await admin.listDatabases();
    
    console.log('\n========== BASES DE DATOS DISPONIBLES ==========');
    if (databases.databases.length > 0) {
      databases.databases.forEach((db, index) => {
        console.log(`${index + 1}. ${db.name} (${Math.round(db.sizeOnDisk / 1024)} KB)`);
      });
    } else {
      console.log('No se encontraron bases de datos.');
    }
    
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('\nConexión a la base de datos cerrada.');
    
  } catch (error) {
    console.error('Error al verificar la base de datos:', error.message);
  }
}

// Ejecutar la función
checkDatabase();