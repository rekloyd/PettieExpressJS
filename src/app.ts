import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './db/connection';
import { crearUsuariosPorDefecto } from './utils/crearUsuariosPorDefecto';
import  usuarioRoutes from './routes/usuarioRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Archivos estáticos (imágenes)
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas de usuario
app.use('/api', usuarioRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ text: "conectado a la API" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});


app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  const db = await connectDB();
  await crearUsuariosPorDefecto(db);
});
