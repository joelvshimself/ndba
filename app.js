// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const { sequelize, Noticia } = require('./db');  // Ahora el modelo se llama Noticia

const port = process.env.PORT || 3000;
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    await sequelize.sync();
    console.log('Modelos sincronizados correctamente.');

    app.listen(port, () => {
      console.log(`Aplicación escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

// Crear noticia
app.post('/noticias', async (req, res) => {
  try {
    const { Nombre, Descripcion, Link } = req.body;
    const nuevaNoticia = await Noticia.create({ Nombre, Descripcion, Link });
    res.status(201).json(nuevaNoticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear noticia', detalle: error.message });
  }
});

// Obtener todas las noticias
app.get('/noticias', async (req, res) => {
  try {
    const noticias = await Noticia.findAll();
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias', detalle: error.message });
  }
});

// Obtener una noticia por ID
app.get('/noticias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }
    res.status(200).json(noticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la noticia', detalle: error.message });
  }
});

// Eliminar una noticia por ID
app.delete('/noticias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }
    await noticia.destroy();
    res.status(200).json({ mensaje: 'Noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la noticia', detalle: error.message });
  }
});

// Ruta de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ mensaje: 'todo bien humano' });
});
