import { Request, Response } from 'express';
import connectDB from '../db/connection';
import { UsuarioBase } from '../models/UsuarioBase';
import { TipoUsuario } from '../models/enum/TipoUsuario';
import path from 'path';
import { Mascota } from '../models/Mascota';
import { UsuarioConMascotasAnidadas, MascotaUsuario } from '../types/usuario.types';
import { RowDataPacket } from 'mysql2';





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



export const getUsuarioCompletoID = async (req: Request, res: Response): Promise<void> => {
  const usuarioId = req.params.idUsuario;

  try {
    const db = await connectDB();

    // Consulta SQL: obtenemos los datos del usuario y sus mascotas
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT 
        Usuario.idUsuario as idUsuario,
        Usuario.nombreUsuario as nombre,
        Usuario.emailUsuario as email,
        Usuario.cantidadPettieCoins as pettieCoins,
        Mascota.idMascota AS mascotaId,
        Mascota.nombreMascota AS mascotaNombre,
        Mascota.tamanoMascota as tamano,
        Mascota.cuidadosEspeciales  as cuidados,
        Mascota.paseoManana as paseoManana,
        Mascota.paseoMedioDia as paseoMedioDia,
        Mascota.paseoTarde as paseoTarde,
        Mascota.razaPerro as razaPerro,
        Mascota.razaGato as razaGato
      FROM Usuario 
      LEFT JOIN Mascota ON Mascota.idOwner = Usuario.idUsuario 
      WHERE Usuario.idUsuario = ?`,
      [usuarioId]
    );
    

    // Si no se encuentra el usuario, devolvemos 404
    if (rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Creamos el objeto del usuario
    const usuario: UsuarioConMascotasAnidadas = {
      id: rows[0].idUsuario,  
      nombre: rows[0].nombre,
      email: rows[0].email,
      cantidadPettieCoins:rows[0].pettieCoins,
      mascotas: []  
    };


    //Debug console log
    console.log(JSON.stringify(rows, null, 2));
    for (const row of rows) {
      if (row.mascotaId) {
        const mascota: MascotaUsuario = {
          id: row.mascotaId,
          nombre: row.mascotaNombre,
          tamano: row.tamano,
          cuidadosEspeciales: row.cuidados,
          paseoManana: row.paseoManana,
          paseoMedioDia: row.paseoMedioDia,
          paseoTarde: row.paseoTarde,
          razaPerro:row.razaPerro,
          razaGato:row.razaGato
        };
        usuario.mascotas.push(mascota);
      }
    }



    // Devolvemos el usuario con su lista de mascotas
    res.json(usuario);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener los datos del usuario' });
  }
};

//Actualizar un usuario de forma dinámica. Solo se actualiza lo que recibe en el body
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const camposActualizables = ['nombreUsuario', 'emailUsuario', 'contrasenaUsuario', 'cantidadPettieCoins', 'role'];
  const updates: string[] = [];
  const values: any[] = [];

  //Añadimos lo que toca actualizar en los dos arrays para luego pasarlos como datos en la consulta
  for (const campo of camposActualizables) {
    if (req.body[campo] !== undefined) {
      updates.push(`${campo} = ?`);
      values.push(req.body[campo]);
    }
  }

  if (updates.length === 0) {
    res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    return;
  }

  values.push(id); // Para el WHERE

  try {
    const db = await connectDB();
    const [result] = await db.execute(
      `UPDATE Usuario SET ${updates.join(', ')} WHERE idUsuario = ?`,
      values
    );

    const { affectedRows } = result as any;

    if (affectedRows === 0) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
      res.json({ mensaje: 'Usuario actualizado correctamente' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};
export const insertUsuario = async (req: Request, res: Response): Promise<void> => {
  const {
    nombreUsuario,
    emailUsuario,
    contrasenaUsuario,
    cantidadPettieCoins = 0,
    role,
    fechaAltaPlataforma,
    numeroCuenta // solo necesario para pettier
  } = req.body;

  if (!nombreUsuario || !emailUsuario || !contrasenaUsuario || !role) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }

  try {
    const conn = await connectDB(); // conexión directa

    await conn.beginTransaction();

    const [usuarioResult] = await conn.execute(
      `INSERT INTO Usuario (nombreUsuario, emailUsuario, contrasenaUsuario, cantidadPettieCoins, role, fechaAltaPlataforma)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombreUsuario, emailUsuario, contrasenaUsuario, cantidadPettieCoins, role, fechaAltaPlataforma || new Date()]
    );

    const idUsuario = (usuarioResult as any).insertId;

    switch (role) {
      case 'admin':
        await conn.execute(`INSERT INTO Admin (idAdmin) VALUES (?)`, [idUsuario]);
        break;

      case 'owner':
        await conn.execute(`INSERT INTO Owner (idOwner) VALUES (?)`, [idUsuario]);
        break;

      case 'pettier':
        if (!numeroCuenta) {
          await conn.rollback();
          res.status(400).json({ error: 'numeroCuenta es obligatorio para pettier' });
          return;
        }
        await conn.execute(
          `INSERT INTO Pettier (idPettier, numeroCuenta) VALUES (?, ?)`,
          [idUsuario, numeroCuenta]
        );
        break;

      default:
        await conn.rollback();
        res.status(400).json({ error: 'Role inválido' });
        return;
    }

    await conn.commit();
    await conn.end(); // cerrar la conexión después de usarla

    res.status(201).json({ mensaje: 'Usuario creado correctamente', idUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al insertar el usuario' });
  }
};



//Actualizar un Pettier

export const updatePettier = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { numeroCuenta, serviciosOfrecidos, serviciosPendientes } = req.body;

  try {
    const conn = await connectDB();
    const [result] = await conn.execute(
      `UPDATE Pettier SET numeroCuenta = ?, serviciosOfrecidos = ?, serviciosPendientes = ? WHERE idPettier = ?`,
      [numeroCuenta, serviciosOfrecidos, serviciosPendientes, id]
    );

    const { affectedRows } = result as any;

    if (affectedRows === 0) {
      res.status(404).json({ mensaje: 'Pettier no encontrado' });
    } else {
      res.json({ mensaje: 'Pettier actualizado correctamente' });
    }

    await conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el pettier' });
  }
};



//Actualizar un Owner

export const updateOwner = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { numeroCuenta } = req.body; //Poner aqui los campos si añadimos más.

  try {
    const conn = await connectDB();
    const [result] = await conn.execute(
      `UPDATE Owner SET numeroCuenta = ? WHERE idOwner = ?`,
      [numeroCuenta, id]
    );

    const { affectedRows } = result as any;

    if (affectedRows === 0) {
      res.status(404).json({ mensaje: 'Owner no encontrado' });
    } else {
      res.json({ mensaje: 'Owner actualizado correctamente' });
    }

    await conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el owner' });
  }
};



//Update Admin. No tiene sentido porque el admin solo tiene id

// export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   const { nivelAcceso } = req.body; // ejemplo de campo extendido

//   try {
//     const conn = await connectDB();
//     const [result] = await conn.execute(
//       `UPDATE Admin SET nivelAcceso = ? WHERE idAdmin = ?`,
//       [nivelAcceso, id]
//     );

//     const { affectedRows } = result as any;

//     if (affectedRows === 0) {
//       res.status(404).json({ mensaje: 'Admin no encontrado' });
//     } else {
//       res.json({ mensaje: 'Admin actualizado correctamente' });
//     }

//     await conn.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error al actualizar el admin' });
//   }
// };


//Eliminar un Usuario
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [result] = await db.execute('DELETE FROM Usuario WHERE idUsuario = ?', [id]);

    const { affectedRows } = result as any;

    if (affectedRows === 0) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
      res.json({ mensaje: 'Usuario eliminado correctamente' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

