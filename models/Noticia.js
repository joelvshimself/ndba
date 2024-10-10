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
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    Link: {
      type: DataTypes.STRING(128),
      allowNull: false,
    }

  }, {
    tableName: 'Asignaciones',
    timestamps: false,
  });


  return Noticia;
};
