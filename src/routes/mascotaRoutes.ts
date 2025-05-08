import { Router, Request, Response } from 'express';
import connectDB from '../db/connection';
import path from 'path';
import { getMascotas, getMascotasPorId, getMascotasPorIdOwner } from '../controllers/MascotaController';

const router = Router();

//Rutas GET

router.get('/mascotas', getMascotas);
router.get('/mascotas/owner/:idOwner', getMascotasPorIdOwner);
router.get('/mascotas/:idMascota', getMascotasPorId);


export default router;

