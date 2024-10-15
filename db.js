// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crear la instancia de Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Importar el modelo Noticia
const Noticia = require('./models/Noticia')(sequelize);

// Sincronizar el modelo con la base de datos
sequelize.sync({ alter: true })  // Esto asegura que el modelo y la DB estén sincronizados, alterando la tabla si es necesario
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

module.exports = {
  sequelize,
  Noticia,
};
