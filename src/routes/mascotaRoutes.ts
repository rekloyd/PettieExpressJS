import { Router, Request, Response } from 'express';
import connectDB from '../db/connection';
import path from 'path';
import { getMascotas } from '../controllers/MascotaController';

const router = Router();

//Rutas GET

router.get('/mascotas', getMascotas);


export default router;

