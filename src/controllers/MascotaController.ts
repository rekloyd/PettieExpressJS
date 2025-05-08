import { Request, Response } from 'express';
import connectDB from '../db/connection';

// GET de todas las mascotas con paginación
export const getMascotas = async (req: Request, res: Response): Promise<void> => {
  const page   = parseInt(req.query.page  as string) || 1;
  const limit  = parseInt(req.query.limit as string) || 50;
  const offset = (page - 1) * limit;

  try {
    const db = await connectDB();
    const [rows] = await db.query(`
      SELECT * 
      FROM Mascota 
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener las mascotas' });
  }
};


export const getMascotasPorId = async (req: Request, res: Response): Promise<void> => {
  const idMascota = req.params.idMascota;

  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Mascota WHERE idMascota = ? ', [idMascota]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener las mascotas' });
  }
};

export const getMascotasPorIdOwner = async (req: Request, res: Response): Promise<void> => {
  const idOwner = req.params.idOwner;

  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Mascota WHERE idOwner = ? ', [idOwner]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener las mascotas' });
  }
};

// PUT para actualizar una mascota existente
export const actualizarMascota = async (req: Request, res: Response): Promise<void> => {
  const idMascota = parseInt(req.params.idMascota, 10);
  const {
    nombreMascota,
    tamanoMascota,
    cuidadosEspeciales,
    paseoManana,
    paseoMedioDia,
    paseoTarde,
    razaPerro,
    razaGato
  } = req.body;

  try {
    const db = await connectDB();
    const [result] = await db.query(`
      UPDATE Mascota
      SET nombreMascota       = ?,
          tamanoMascota       = ?,
          cuidadosEspeciales  = ?,
          paseoManana         = ?,
          paseoMedioDia       = ?,
          paseoTarde          = ?,
          razaPerro           = ?,
          razaGato            = ?
      WHERE idMascota = ?
    `, [
      nombreMascota,
      tamanoMascota,
      cuidadosEspeciales,
      paseoManana,
      paseoMedioDia,
      paseoTarde,
      razaPerro,
      razaGato,
      idMascota
    ]);

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: 'Mascota no encontrada' });
    } else {
      res.json({ message: 'Mascota actualizada correctamente' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la mascota' });
  }
};

// DELETE para borrar una mascota
export const eliminarMascota = async (req: Request, res: Response): Promise<void> => {
  const idMascota = parseInt(req.params.idMascota, 10);

  try {
    const db = await connectDB();
    const [result] = await db.query(`
      DELETE FROM Mascota 
      WHERE idMascota = ?
    `, [idMascota]);

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ error: 'Mascota no encontrada' });
    } else {
      res.json({ message: 'Mascota eliminada correctamente' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar la mascota' });
  }
};

export const crearMascota = async (req: Request, res: Response): Promise<void> => {
  const { nombre, especie, edad, idOwner } = req.body;

  try {
    const db = await connectDB();
    const [result] = await db.query('INSERT INTO Mascota (nombre, especie, edad, idOwner) VALUES (?, ?, ?, ?)', [nombre, especie, edad, idOwner]);
    res.status(201).json({ message: 'Mascota creada exitosamente', id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la mascota' });
  }
};
