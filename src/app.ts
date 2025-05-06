// app.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connection';
import { crearUsuariosPorDefecto } from './utils/crearUsuariosPorDefecto';
import { Connection } from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ text: "conectado a la API" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

app.get('/api/usuarios', async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Usuario');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener los usuarios' });
  }
});

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  const db = await connectDB();
  await crearUsuariosPorDefecto(db);
});
