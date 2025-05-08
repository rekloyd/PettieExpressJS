import { Request, Response } from 'express';
import connectDB from '../db/connection';
import { Mascota } from '../models/Mascota'; 
import path from 'path';


//GET de todos las Mascotas 

export const getMascotas = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;
  
    try {
      const db = await connectDB();
      const [rows] = await db.query('SELECT * FROM Mascota LIMIT ? OFFSET ?', [limit, offset]);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Algo salió mal al obtener las mascotas' });
    }
  };

  //GET de una mascota en específico

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


  

  