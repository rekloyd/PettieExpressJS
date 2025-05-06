import { Request, Response } from 'express';
import connectDB from '../db/connection';
import { UsuarioBase } from '../models/UsuarioBase';
import { TipoUsuario } from '../models/enum/TipoUsuario';
import path from 'path';


// Obtener usuarios totales
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;
  
    try {
      const db = await connectDB();
      const [rows] = await db.query('SELECT * FROM Usuario LIMIT ? OFFSET ?', [limit, offset]);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Algo salió mal al obtener los usuarios' });
    }
  };
  


  //Obtener usuarios por role segun ID
export const getUsuarioPorID = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    // Conectar a la base de datos
    const db = await connectDB();
    const [rows]: any = await db.query(
      'SELECT idUsuario, nombreUsuario, emailUsuario, role FROM Usuario WHERE idUsuario = ?',
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).send('Usuario no encontrado');
    }

    const user = rows[0];

    console.log('Role del usuario desde DB:', user.role);

    const role = user.role.toUpperCase(); // Aseguramos que el valor del rol está en mayúsculas

    // Verificamos que el rol sea válido en el enum
    if (!(role in TipoUsuario)) {
      res.status(400).send('Role de usuario no válido');
    }

    // Creamos un objeto UsuarioBase con los datos obtenidos
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

    // Enviar el archivo de imagen como respuesta
    return res.sendFile(imagePath);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Error interno del servidor');
  }
};