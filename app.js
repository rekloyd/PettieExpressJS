const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Carga variables de .env en process.env

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/', (req, res) => {
  //res.send('Bienvenido a mi API!');
  res.json({
    text:"conectado a la API"
  })
});

app.get('/api/saludo/:q', (req, res) => {
    const nombre = req.params.q;
    res.json({ mensaje: `Hola, ${nombre}` });
  });


app.post('/api/saludo', (req, res) => {
  const { nombre } = req.body;
  res.status(201).json({ mensaje: `Hola, ${nombre}!` });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
