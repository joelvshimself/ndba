// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

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

// Importar modelos
const Noticia = require('./models/Noticia')(sequelize);



module.exports = {
  sequelize,
  Noticia,
};
