import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Cargar variables de .env en process.env
dotenv.config();
import '../db/connection'; // Conexión a la DB MariaDB


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.json({
    text: "conectado a la API"
  });
});

// Ruta con parámetro
app.get('/api/saludo/:q', (req: Request, res: Response) => {
  const nombre = req.params.q;
  res.json({ mensaje: `Hola, ${nombre}` });
});

// Ruta POST
app.post('/api/saludo', (req: Request, res: Response) => {
  const { nombre } = req.body;
  res.status(201).json({ mensaje: `Hola, ${nombre}!` });
});

// Middleware para manejar errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
