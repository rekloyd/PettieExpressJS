import { Request, Response } from 'express';
import connectDB from '../db/connection';
import mascotasRepository from '../repositories/mascotasRepository ';

// GET de todas las mascotas con paginación
export const getMascotas = async (req: Request, res: Response): Promise<void> => {
  const page   = parseInt(req.query.page  as string) || 1;
  const limit  = parseInt(req.query.limit as string) || 50;

  try {
    const data = await mascotasRepository.getMascotas(page,limit);
    res.json(data); //Devolver los rows en json

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener las mascotas' });
  }
};

//GET de las mascotas por su id. Traer los datos de una sola mascota
/**
 * 
 * @param req el parametro que requerimos es el idMascota para filtrar por esta mascota
 * @param res nuestro res es el json de las rows o en su defecto un error.
 */
export const getMascotasPorId = async (req: Request, res: Response): Promise<void> => {
  const idMascota = req.params.idMascota;

  try {
    const data = await mascotasRepository.getMascotasPorId(idMascota);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Algo salió mal al obtener las mascotas' });
  }
};

/**
 * 
 * @param req requerimos el idOwner como param en la url para poder traernos toda la info de las mascotas de ese idOwner
 * @param res un array de datos json o un mensaje de error.
 * Usamoe el repositorio de mascotasRepository
 */
export const getMascotasPorIdOwner = async (req: Request, res: Response): Promise<void> => {
  const idOwner = req.params.idOwner;

  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Mascota WHERE idOwner = ? ', [idOwner]);
    console.log(`SELECT * FROM Mascota WHERE idOwner = ${idOwner}`);
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
  const idMascota = parseInt(req.params.idMascota, 10); // Si no funciona quitar el 10

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
  const { nombreMascota,tamanoMascota,cuidadosEspeciales,paseoManana,paseoMedioDia,paseoTarde,razaPerro,razaGato,idOwner } = req.body;

  try {

    const db = await connectDB();
    const [result] = await db.query('INSERT INTO Mascota (nombreMascota,tamanoMascota,cuidadosEspeciales,paseoManana,paseoMedioDia,paseoTarde,razaPerro,razaGato,idOwner) VALUES (?,?,?,?,?,?,?,?,?)', [nombreMascota,tamanoMascota,cuidadosEspeciales,paseoManana,paseoMedioDia,paseoTarde,razaPerro,razaGato,idOwner]);
    res.status(201).json({ message: 'Mascota creada exitosamente', id: (result as any).insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear la mascota' });
  }
};

export const getMascotasFiltered = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("ejecutada la función");

    const page   = parseInt(req.query.page as string) || 1;
    const limit  = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const { idOwner, nombreMascota, tamanoMascota, razaPerro, razaGato } = req.query;
    const where: string[] = [];
    const params: unknown[]  = [];

    if (idOwner) {
      const ownerId = Number(idOwner);
      if (isNaN(ownerId)) {
        res.status(400).json({ error: '"idOwner" debe ser un número válido' });
        return;
      }
      where.push('idOwner = ?');
      params.push(ownerId);
    }

    if (nombreMascota) {
      where.push('nombreMascota LIKE ?');
      params.push(`%${nombreMascota}%`);
    }
    if (tamanoMascota) {
      where.push('tamanoMascota = ?');
      params.push(tamanoMascota);
    }
    if (razaPerro) {
      where.push('razaPerro LIKE ?');
      params.push(`%${razaPerro}%`);
    }
    if (razaGato) {
      where.push('razaGato LIKE ?');
      params.push(`%${razaGato}%`);
    }

    const whereSQL = where.length ? 'WHERE ' + where.join(' AND ') : '';
    const sql = `
      SELECT * FROM Mascota
      ${whereSQL}
      ORDER BY idMascota
      LIMIT ? OFFSET ?
    `;

    console.log('SQL:', sql);
    console.log('Params:', params);

    const db = await connectDB();
    const [rows] = await db.query(sql, [...params, limit, offset]);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al filtrar mascotas:', err);
    res.status(500).json({ error: 'Error interno al filtrar mascotas' });
  }
};
