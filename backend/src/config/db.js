const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Especificamos explícitamente la base de datos TiendaOnline en la URI
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://rubenroa973299:973299@cluster0.sjgdfeu.mongodb.net/TiendaOnline', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);
    
    // Información de modelos disponibles para depuración
    console.log(`Modelos registrados: ${Object.keys(mongoose.models).join(', ')}`);
    
    return true;
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 