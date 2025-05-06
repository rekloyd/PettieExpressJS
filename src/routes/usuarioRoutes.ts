import { Router, Request, Response } from 'express';
import connectDB from '../db/connection';
import path from 'path';
import { UsuarioBase } from '../models/UsuarioBase';
import { TipoUsuario } from '../models/enum/TipoUsuario';

import { getUsuarios } from '../controllers/UsuarioController';
import { getUsuarioPorID } from '../controllers/UsuarioController';

const router = Router();

// Ruta para devolver imagen según rol || Se podra aprovechar para dashboard posteriormente
router.get('/usuario/:id',getUsuarioPorID);

// Ruta para devolver listado completo usuarios

router.get('/usuarios', getUsuarios);

export default router;
