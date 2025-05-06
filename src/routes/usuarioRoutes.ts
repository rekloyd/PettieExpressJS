import { Router, Request, Response } from 'express';
import connectDB from '../db/connection';
import path from 'path';
import { UsuarioBase } from '../models/UsuarioBase';
import { TipoUsuario } from '../models/enum/TipoUsuario';

const router = Router();

// Ruta para devolver imagen según rol || Se podra aprovechar para dashboard posteriormente
router.get('/usuario/:id', (req: Request, res: Response) => {
  (async () => {
    const id = req.params.id;

    try {
      const db = await connectDB();
      const [rows]: any = await db.query(
        'SELECT idUsuario, nombreUsuario, emailUsuario, role FROM Usuario WHERE idUsuario = ?',
        [id]
      );

      if (!rows || rows.length === 0) {
        return res.status(404).send('Usuario no encontrado');
      }

      const user = rows[0];

      console.log('Role del usuario desde DB:', user.role); 

      const role = user.role.toUpperCase(); // Hacer que el valor de role coincida con el enum
      // Verificar si el valor de role ahora está mapeado correctamente
      if (!(role in TipoUsuario)) {
        return res.status(400).send('Role de usuario no válido');
      }

      const usuario = new UsuarioBase(
        user.idUsuario,
        'nombrePlaceholder',
        user.nombreUsuario,
        'contrasenaPlaceholder',
        user.emailUsuario,
        0,
        TipoUsuario[role as keyof typeof TipoUsuario], 
        new Date()
      );

      console.log('Role mapeado del usuario:', usuario.role); 

      // Generar la ruta de la imagen según el rol
      const imagePath = path.resolve(__dirname, '..', '..', 'public', 'images', `${usuario.role}.png`);
      console.log('Ruta de la imagen:', imagePath); 

      return res.sendFile(imagePath);
    } catch (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Error interno del servidor');
    }
  })();
});

// Ruta para devolver listado completo usuarios

router.get('/usuarios', async (req: Request, res: Response) => {
    try {
      const db = await connectDB();
      const [rows] = await db.query('SELECT * FROM Usuario');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Algo salió mal al obtener los usuarios' });
    }
  });

export default router;
