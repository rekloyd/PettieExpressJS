import { Request, Response } from 'express';
import connectDB from '../db/connection';

// Obtener todos los servicios con paginación
enum FK_TABLES { Owner = 'Owner', Pettier = 'Pettier', Mascota = 'Mascota' }

export const getServicios = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = (page - 1) * limit;

  try {
    const db = await connectDB();
    const [rows] = await db.query(
      `SELECT * FROM Servicio
       ORDER BY fechaInicio DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener servicios:', err);
    res.status(500).json({ error: 'Algo salió mal al obtener los servicios' });
  }
};

// Obtener un servicio por su ID
export const getServicioPorID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [rows]: any = await db.query(
      `SELECT * FROM Servicio WHERE idActividad = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ mensaje: 'Servicio no encontrado' });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error al obtener servicio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Validar existencia de FK genérico
async function validateFK(db: any, table: FK_TABLES, idField: string, idValue: number): Promise<boolean> {
  const [result]: any = await db.query(
    `SELECT COUNT(*) AS cnt FROM ${table} WHERE ${idField} = ?`,
    [idValue]
  );
  return result[0].cnt > 0;
}

// Insertar un nuevo servicio con validación de claves foráneas
export const insertServicio = async (req: Request, res: Response): Promise<void> => {
  const {
    idOwner,
    idPettier,
    idMascota,
    tipoActividad,
    fechaInicio,
    fechaFinal,
    precio = 0,
    finalizado = 0
  } = req.body;

  if (!idOwner || !idPettier || !idMascota || !tipoActividad || !fechaInicio) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }

  try {
    const db = await connectDB();

    // Validar Owner
    if (!(await validateFK(db, FK_TABLES.Owner, 'idOwner', idOwner))) {
      res.status(400).json({ error: `Owner con id ${idOwner} no existe` });
      return;
    }
    // Validar Pettier
    if (!(await validateFK(db, FK_TABLES.Pettier, 'idPettier', idPettier))) {
      res.status(400).json({ error: `Pettier con id ${idPettier} no existe` });
      return;
    }
    // Validar Mascota
    if (!(await validateFK(db, FK_TABLES.Mascota, 'idMascota', idMascota))) {
      res.status(400).json({ error: `Mascota con id ${idMascota} no existe` });
      return;
    }

    // Insertar
    const [result]: any = await db.execute(
      `INSERT INTO Servicio
         (idOwner, idPettier, idMascota, tipoActividad, fechaInicio, fechaFinal, precio, finalizado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [idOwner, idPettier, idMascota, tipoActividad, fechaInicio, fechaFinal, precio, finalizado]
    );

    res.status(201).json({ mensaje: 'Servicio creado correctamente', idActividad: result.insertId });
  } catch (err: any) {
    console.error('Error al insertar servicio:', err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      res.status(409).json({ error: 'Violación de integridad referencial' });
    } else {
      res.status(500).json({ error: 'Error al crear el servicio' });
    }
  }
};

// Actualizar un servicio con validación de FK
enum ServiceFields { idOwner = 'idOwner', idPettier = 'idPettier', idMascota = 'idMascota', tipoActividad = 'tipoActividad', fechaInicio = 'fechaInicio', fechaFinal = 'fechaFinal', precio = 'precio', finalizado = 'finalizado' }
export const updateServicio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updates: string[] = [];
  const values: any[] = [];

  for (const field of Object.values(ServiceFields)) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (updates.length === 0) {
    res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    return;
  }

  try {
    const db = await connectDB();

    // Validaciones FK si vienen en body
    if (req.body.idOwner && !(await validateFK(db, FK_TABLES.Owner, 'idOwner', req.body.idOwner))) {
      res.status(400).json({ error: `Owner con id ${req.body.idOwner} no existe` });
      return;
    }
    if (req.body.idPettier && !(await validateFK(db, FK_TABLES.Pettier, 'idPettier', req.body.idPettier))) {
      res.status(400).json({ error: `Pettier con id ${req.body.idPettier} no existe` });
      return;
    }
    if (req.body.idMascota && !(await validateFK(db, FK_TABLES.Mascota, 'idMascota', req.body.idMascota))) {
      res.status(400).json({ error: `Mascota con id ${req.body.idMascota} no existe` });
      return;
    }

    values.push(id);
    const [result]: any = await db.execute(
      `UPDATE Servicio SET ${updates.join(', ')} WHERE idActividad = ?`,
      values
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Servicio no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Servicio actualizado correctamente' });
    }
  } catch (err: any) {
    console.error('Error al actualizar servicio:', err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      res.status(409).json({ error: 'Violación de integridad referencial' });
    } else {
      res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
  }
};

// Eliminar un servicio verificando PK
export const deleteServicio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const db = await connectDB();
    const [result]: any = await db.execute(
      `DELETE FROM Servicio WHERE idActividad = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Servicio no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Servicio eliminado correctamente' });
    }
  } catch (err) {
    console.error('Error al eliminar servicio:', err);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};
