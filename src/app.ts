import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { loginController } from './controllers/loginController';
import connectDB from './db/connection';
import { crearUsuariosPorDefecto } from './utils/crearUsuariosPorDefecto';
import usuarioRoutes from './routes/usuarioRoutes';
import mascotaRoutes from './routes/mascotaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api', loginController);
app.use('/api', usuarioRoutes);
app.use('/api',mascotaRoutes);

app.use('/',(req:Request,res:Response)=>{
  res.send("Conectado con la api");

});
// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 500
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Arranque
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  const db = await connectDB();
  await crearUsuariosPorDefecto(db);
});
