import { Router, Request, Response } from 'express';
import connectDB from '../db/connection';
import path from 'path';
import { UsuarioBase } from '../models/UsuarioBase';
import { TipoUsuario } from '../models/enum/TipoUsuario';

import { deleteUsuario, getUsuarios, updatePettier, updateUsuario,getUsuarioCompletoID } from '../controllers/UsuarioController';
import { getUsuarioPorID } from '../controllers/UsuarioController';

const router = Router();

// Ruta para devolver imagen según rol || Se podra aprovechar para dashboard posteriormente
router.get('/usuario/:id',getUsuarioPorID);

// Ruta para devolver listado completo usuarios

router.get('/usuarios', getUsuarios);

// Actualiza campos parciales del usuario (email, contraseña, role, etc.)
router.put('/usuario/:id', updateUsuario);

// Elimina un usuario por su ID
router.delete('/usuario/:id', deleteUsuario);

router.put('/pettier/:id', updatePettier);


router.get('/usuario/mascota/:idUsuario',getUsuarioCompletoID);

export default router;
