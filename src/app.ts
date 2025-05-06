// app.ts
import express, { Request, Response, NextFunction } from 'express';
import './db/connection'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ text: "conectado a la API" });
});

app.get('/api/saludo/:q', (req: Request, res: Response) => {
  const nombre = req.params.q;
  res.json({ mensaje: `Hola, ${nombre}` });
});

app.post('/api/saludo', (req: Request, res: Response) => {
  const { nombre } = req.body;
  res.status(201).json({ mensaje: `Hola, ${nombre}!` });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
