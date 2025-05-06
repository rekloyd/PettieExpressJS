import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import login from '../services/loginService';

const router: Router = Router();

// Vista de login (HTML)
router.get('/', (_req: Request, res: Response) => {
  res.sendFile('login.html', { root: path.join(__dirname, '../../public') });
});


router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      // 1. Loguear el payload recibido  
      console.log('📥 Login payload:', req.body);

      const { nombreUsuario, contrasenaUsuario } = req.body;

      // 2. Validar campos obligatorios  
      if (!nombreUsuario || !contrasenaUsuario) {
        console.warn('⚠️ Faltan campos en login'); 
        return res
          .status(400)
          .json({ status: 400, message: 'Usuario y contraseña son requeridos' });
      }

      // 3. Llamar al servicio de login  
      const result = await login(nombreUsuario, contrasenaUsuario); 
      console.log('✅ Resultado de loginService:', result); 

      return res.status(result.status).json(result);
    } catch (err) {
      // 4. Capturar y propagar errores al middleware  
      console.error('💥 Error en loginController IIFE:', err); 
      next(err);
    }
  })(); 
});

export const loginController = router;
