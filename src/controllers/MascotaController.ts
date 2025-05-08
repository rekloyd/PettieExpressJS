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

// GET de las mascotas de un owner concreto
export const getMascotasPorOwner = async (req: Request, res: Response): Promise<void> => {
  const idOwner = parseInt(req.params.idOwner, 10);

  try {
    const db = await connectDB();
    const [rows] = await db.query(`
      SELECT * 
      FROM Mascota 
      WHERE idOwner = ?
    `, [idOwner]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener las mascotas del owner' });
  }
};

// GET de una mascota por su idMascota
export const getMascotasPorId = async (req: Request, res: Response): Promise<void> => {
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

// POST para crear una nueva mascota
export const crearMascota = async (req: Request, res: Response): Promise<void> => {
  const {
    idOwner,
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
      INSERT INTO Mascota 
        (idOwner, nombreMascota, tamanoMascota, cuidadosEspeciales, paseoManana, paseoMedioDia, paseoTarde, razaPerro, razaGato)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      idOwner,
      nombreMascota,
      tamanoMascota,
      cuidadosEspeciales,
      paseoManana,
      paseoMedioDia,
      paseoTarde,
      razaPerro,
      razaGato
    ]);

    // insertId viene de ResultSetHeader
    const insertId = (result as any).insertId;
    res.status(201).json({
      message: 'Mascota creada exitosamente',
      idMascota: insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la mascota' });
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
