const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a la base de datos MongoDB');
  } catch (err) {
    console.error('Error al conectar a la base de datos', err);
    process.exit(1);
  }
};

module.exports = { connectDB };