import { Router, Request, Response } from 'express';
import connectDB from '../db/connection';
import path from 'path';
import { UsuarioBase } from '../models/UsuarioBase';
import { TipoUsuario } from '../models/enum/TipoUsuario';

import { deleteUsuario, getUsuarios, updatePettier, updateUsuario,getUsuarioCompletoID, updateOwner,getUsuariosFiltrados, insertUsuario, sumarPettieCoins } from '../controllers/UsuarioController';
import { getUsuarioPorID } from '../controllers/UsuarioController';

const router = Router();

// Ruta para devolver imagen según rol || Se podra aprovechar para dashboard posteriormente
router.get("/usuarios/filter", getUsuariosFiltrados);
router.get('/usuario/:id',getUsuarioPorID);
    
router.post('/usuario/', insertUsuario)

// Ruta para devolver listado completo usuarios

router.get('/usuarios', getUsuarios);

// Actualiza campos parciales del usuario (email, contraseña, role, etc.)
router.put('/usuario/:id', updateUsuario);

// Elimina un usuario por su ID
router.delete('/usuario/:id', deleteUsuario);

router.put('/pettier/:id', updatePettier);

router.put('/owner/:id', updateOwner);

router.get('/usuario/mascota/:idUsuario',getUsuarioCompletoID);

router.put("/usuario/:idUsuario/pettiecoins", sumarPettieCoins);

export default router;
