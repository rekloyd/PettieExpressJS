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
  
  export const getUsuarioPorID = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
  
    try {
      // Conectar a la base de datos
      const db = await connectDB();
      const [rows]: any = await db.query(
        `SELECT idUsuario, nombreUsuario, emailUsuario, role, cantidadPettieCoins, fechaAltaPlataforma
         FROM Usuario WHERE idUsuario = ?`,
        [id]
      );
  
      if (!rows || rows.length === 0) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
  
      const user = rows[0];
  
      // Validar role, convierto a mayúsculas para comparar
      const roleUpper = user.role.toUpperCase();
  
      if (!(roleUpper in TipoUsuario)) {
        res.status(400).json({ error: "Role de usuario no válido" });
        return;
      }
  
      // Crear instancia UsuarioBase si necesitas lógica adicional, o simplemente responde JSON
      const usuario = {
        nombreUsuario: user.nombreUsuario,
        emailUsuario: user.emailUsuario,
        cantidadPettieCoins: user.cantidadPettieCoins ?? 0,
        role: user.role.toLowerCase(), // Para que coincida con frontend "admin" | "owner" | "pettier"
        fechaAltaPlataforma: user.fechaAltaPlataforma ? user.fechaAltaPlataforma.toISOString() : new Date().toISOString(),
      };
  
      // Enviar JSON con los datos del usuario
      res.json(usuario);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).json({ error: "Error interno del servidor" });
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
  } = req.body;

  if (!nombreUsuario || !emailUsuario || !contrasenaUsuario || !role) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }

  try {
    const conn = await connectDB();
    await conn.beginTransaction();

    const insertUsuarioSQL = `
      INSERT INTO Usuario (nombreUsuario, emailUsuario, contrasenaUsuario, cantidadPettieCoins, role, fechaAltaPlataforma)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const usuarioParams = [nombreUsuario, emailUsuario, contrasenaUsuario, cantidadPettieCoins, role, fechaAltaPlataforma || new Date()];

    console.log('🟨 SQL Usuario:', insertUsuarioSQL);
    console.log('🟨 Params Usuario:', usuarioParams);

    const [usuarioResult] = await conn.execute(insertUsuarioSQL, usuarioParams);
    const idUsuario = (usuarioResult as any).insertId;

    switch (role) {
      case 'admin':
        console.log('🟨 INSERT INTO Admin (idAdmin)', [idUsuario]);
        await conn.execute(`INSERT INTO Admin (idAdmin) VALUES (?)`, [idUsuario]);
        break;

      case 'owner':
        console.log('🟨 INSERT INTO Owner (idOwner)', [idUsuario]);
        await conn.execute(`INSERT INTO Owner (idOwner) VALUES (?)`, [idUsuario]);
        break;

      case 'pettier':
        console.log('🟨 INSERT INTO Pettier (idPettier)', [idUsuario]);
        await conn.execute(
          `INSERT INTO Pettier (idPettier) VALUES (?)`,
          [idUsuario]
        );
        break;

      default:
        await conn.rollback();
        res.status(400).json({ error: 'Role inválido' });
        return;
    }

    await conn.commit();
    await conn.end();

    res.status(201).json({ mensaje: 'Usuario creado correctamente', idUsuario });
  } catch (err) {
    console.error('❌ Error al insertar usuario:', err);
    res.status(500).json({ error: 'Error al insertar el usuario', detalles: err instanceof Error ? err.message : err });
  }
};



//Actualizar un Pettier

export const updatePettier = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { numeroCuenta} = req.body;

  try {
    const conn = await connectDB();
    const [result] = await conn.execute(
      `UPDATE Pettier SET numeroCuenta = ? WHERE idPettier = ?`,
      [numeroCuenta, id]
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

//ALTER TABLE Owner add column numeroCuenta varchar(100);

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


export const getUsuariosFiltrados = async (req: Request, res: Response): Promise<void> => {
  const {
    idUsuario,
    nombreUsuario,
    emailUsuario,
    role,
    fechaAltaPlataforma,
    idOwner,
    idPettier
  } = req.query;

  // Claúsulas y parámetros
  const whereClauses: string[] = [];
  const params: any[] = [];
  let joinClauses = '';

  // — Filtrar por Usuario —
  if (idUsuario) {
    if (isNaN(Number(idUsuario))) {
      res.status(400).json({ error: '"idUsuario" debe ser numérico' });
    }
    whereClauses.push('u.idUsuario = ?');
    params.push(Number(idUsuario));
  }

  if (nombreUsuario) {
    whereClauses.push('u.nombreUsuario LIKE ?');
    params.push(`%${nombreUsuario}%`);
  }

  if (emailUsuario) {
    whereClauses.push('u.emailUsuario LIKE ?');
    params.push(`%${emailUsuario}%`);
  }

  if (role) {
    const validRoles = ['admin','owner','pettier'];
    if (!validRoles.includes(role as string)) {
      res.status(400).json({ error: `"role" debe ser uno de ${validRoles.join(', ')}` });
    }
    whereClauses.push('u.role = ?');
    params.push(role);
  }

  if (fechaAltaPlataforma) {
    const ts = Date.parse(fechaAltaPlataforma as string);
    if (isNaN(ts)) {
      res.status(400).json({ error: '"fechaAltaPlataforma" no es una fecha válida' });
    }
    // Comparamos sólo la fecha (YYYY-MM-DD)
    whereClauses.push('DATE(u.fechaAltaPlataforma) = ?');
    params.push((fechaAltaPlataforma as string).split('T')[0]);
  }

  // — Filtrar por Owner —
  if (idOwner) {
    if (isNaN(Number(idOwner))) {
      res.status(400).json({ error: '"idOwner" debe ser numérico' });
    }
    // Hacemos el join con Owner
    joinClauses += ' JOIN Owner o ON u.idUsuario = o.idOwner';
    whereClauses.push('o.idOwner = ?');
    params.push(Number(idOwner));
  }

  // — Filtrar por Pettier —
  if (idPettier) {
    if (isNaN(Number(idPettier))) {
      res.status(400).json({ error: '"idPettier" debe ser numérico' });
    }
    joinClauses += ' JOIN Pettier p ON u.idUsuario = p.idPettier';
    whereClauses.push('p.idPettier = ?');
    params.push(Number(idPettier));
  }

  // Construir SQL
  const whereSQL = whereClauses.length
    ? 'WHERE ' + whereClauses.join(' AND ')
    : '';
  const sql = `
    SELECT u.*
    FROM Usuario u
    ${joinClauses}
    ${whereSQL}
    ORDER BY u.idUsuario
  `;

  try {
    const db = await connectDB();
    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al filtrar usuarios:', err);
    res.status(500).json({ error: 'Error interno del servidor al filtrar usuarios.' });
  }
};


export const sumarPettieCoins = async (req: Request, res: Response): Promise<void> => {
  const idUsuario = parseInt(req.params.idUsuario, 10);
  const { cantidad } = req.body;
  //console.log("PARAMS:", req.params);
  //console.log("BODY:", req.body);


  if (isNaN(idUsuario) || typeof cantidad !== "number" || cantidad <= 0) {
    res.status(400).json({ error: "Parámetros inválidos" });
    return;
  }

  try {
    const db = await connectDB();
    const [result] = await db.query(
      `UPDATE Usuario
       SET cantidadPettieCoins = cantidadPettieCoins + ?
       WHERE idUsuario = ?`,
      [cantidad, idUsuario]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const [rows] = await db.query(
      `SELECT cantidadPettieCoins FROM Usuario WHERE idUsuario = ?`,
      [idUsuario]
    );
    const nuevoTotal = (rows as any[])[0]?.cantidadPettieCoins;

    res.json({
      message: "PettieCoins sumados correctamente",
      cantidadSumada: cantidad,
      nuevoTotal,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar PettieCoins" });
  }
};


// Obtener solo el rol de un usuario por su ID
export const getRolUsuarioPorID = async (req: Request, res: Response): Promise<void> => {
  const idUsuario = req.params.idUsuario;

  if (!idUsuario) {
    res.status(400).json({ error: 'Falta el idUsuario en parámetros' });
    return;
  }

  try {
    const db = await connectDB();
    const [rows]: any = await db.query(
      `SELECT role FROM Usuario WHERE idUsuario = ?`,
      [idUsuario]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    const role = rows[0].role;

    // Validar que el role esté dentro de los permitidos en TipoUsuario (según enum)
    if (!(role.toUpperCase() in TipoUsuario)) {
      res.status(400).json({ error: 'Role de usuario no válido' });
      return;
    }

    // Enviar el rol en minúsculas (como en frontend)
    res.json({ role: role.toLowerCase() });
  } catch (err) {
    console.error('Error al obtener rol de usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};