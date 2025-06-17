require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./backend/src/config/db');

// Definir el modelo de Usuario para este script
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  createdAt: Date
});

const User = mongoose.model('User', UserSchema);

// Función para consultar usuarios
async function getUsers() {
  try {
    // Conectar a la base de datos
    await connectDB();
    
    console.log('Buscando usuarios registrados...');
    
    // Consultar todos los usuarios
    const users = await User.find({}).select('name email role createdAt');
    
    console.log('\n========== USUARIOS REGISTRADOS ==========');
    if (users.length === 0) {
      console.log('No hay usuarios registrados en la base de datos.');
    } else {
      users.forEach((user, index) => {
        console.log(`\nUsuario #${index + 1}:`);
        console.log(`- Nombre: ${user.name}`);
        console.log(`- Email: ${user.email}`);
        console.log(`- Rol: ${user.role || 'usuario'}`);
        console.log(`- Registrado: ${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Fecha no disponible'}`);
      });
      
      console.log(`\nTotal de usuarios: ${users.length}`);
    }
    
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('\nConexión a la base de datos cerrada.');
    
  } catch (error) {
    console.error('Error al consultar usuarios:', error.message);
  }
}

// Ejecutar la función
getUsers();