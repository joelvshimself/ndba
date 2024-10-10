// models/Noticia.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Noticia = sequelize.define('Noticia', {
    Noticia_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Link: {
      type: DataTypes.TEXT,
      allowNull: false,
    }

  }, {
    tableName: 'Asignaciones',
    timestamps: false,
  });


  return Noticia;
};
