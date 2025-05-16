import { Request, Response } from 'express';
import connectDB from '../db/connection';

export const getServiciosOfrecidos = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const offset = (page - 1) * limit;

  try {
    const db = await connectDB();
    const [rows] = await db.query(
      `SELECT * FROM ServicioOfrecido
       ORDER BY fechaInicio DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener servicios ofrecidos:', err);
    res.status(500).json({ error: 'Algo salió mal al obtener los servicios ofrecidos' });
  }
};

export const getServicioOfrecidoPorID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [rows]: any = await db.query(
      `SELECT * FROM ServicioOfrecido WHERE idActividad = ?`,
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ mensaje: 'Servicio ofrecido no encontrado' });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error al obtener servicio ofrecido:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const insertServicioOfrecido = async (req: Request, res: Response): Promise<void> => {
  const {
    idPettier,
    tipoActividad,
    fechaInicio,
    fechaFinal,
    precio = 0,
    animalesAdmitidos
  } = req.body;

  if (!idPettier || !tipoActividad || !fechaInicio || !fechaFinal || !animalesAdmitidos) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }

  try {
    const db = await connectDB();

    // Verificar que el Pettier exista
    const [resultPettier]: any = await db.query(
      `SELECT COUNT(*) AS cnt FROM Pettier WHERE idPettier = ?`,
      [idPettier]
    );

    if (resultPettier[0].cnt === 0) {
      res.status(400).json({ error: `Pettier con id ${idPettier} no existe` });
      return;
    }

    const [result]: any = await db.execute(
      `INSERT INTO ServicioOfrecido 
         (idPettier, tipoActividad, fechaInicio, fechaFinal, precio, animalesAdmitidos)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idPettier, tipoActividad, fechaInicio, fechaFinal, precio, animalesAdmitidos]
    );

    res.status(201).json({ mensaje: 'Servicio ofrecido creado correctamente', idActividad: result.insertId });
  } catch (err: any) {
    console.error('Error al insertar servicio ofrecido:', err);
    res.status(500).json({ error: 'Error al crear el servicio ofrecido' });
  }
};

export const updateServicioOfrecido = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    idPettier,
    tipoActividad,
    fechaInicio,
    fechaFinal,
    precio,
    animalesAdmitidos
  } = req.body;

  const updates: string[] = [];
  const values: any[] = [];

  if (idPettier !== undefined) {
    updates.push('idPettier = ?');
    values.push(idPettier);
  }
  if (tipoActividad !== undefined) {
    updates.push('tipoActividad = ?');
    values.push(tipoActividad);
  }
  if (fechaInicio !== undefined) {
    updates.push('fechaInicio = ?');
    values.push(fechaInicio);
  }
  if (fechaFinal !== undefined) {
    updates.push('fechaFinal = ?');
    values.push(fechaFinal);
  }
  if (precio !== undefined) {
    updates.push('precio = ?');
    values.push(precio);
  }
  if (animalesAdmitidos !== undefined) {
    updates.push('animalesAdmitidos = ?');
    values.push(animalesAdmitidos);
  }

  if (updates.length === 0) {
    res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
    return;
  }

  try {
    const db = await connectDB();

    // Validar Pettier si se proporciona
    if (idPettier !== undefined) {
      const [resultPettier]: any = await db.query(
        `SELECT COUNT(*) AS cnt FROM Pettier WHERE idPettier = ?`,
        [idPettier]
      );
      if (resultPettier[0].cnt === 0) {
        res.status(400).json({ error: `Pettier con id ${idPettier} no existe` });
        return;
      }
    }

    values.push(id);

    const [result]: any = await db.execute(
      `UPDATE ServicioOfrecido SET ${updates.join(', ')} WHERE idActividad = ?`,
      values
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Servicio ofrecido no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Servicio ofrecido actualizado correctamente' });
    }
  } catch (err) {
    console.error('Error al actualizar servicio ofrecido:', err);
    res.status(500).json({ error: 'Error al actualizar el servicio ofrecido' });
  }
};

export const deleteServicioOfrecido = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const [result]: any = await db.execute(
      `DELETE FROM ServicioOfrecido WHERE idActividad = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: 'Servicio ofrecido no encontrado' });
    } else {
      res.status(200).json({ mensaje: 'Servicio ofrecido eliminado correctamente' });
    }
  } catch (err) {
    console.error('Error al eliminar servicio ofrecido:', err);
    res.status(500).json({ error: 'Error al eliminar el servicio ofrecido' });
  }
};
