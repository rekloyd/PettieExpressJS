import connectDB from '../db/connection';

interface LoginResult {
  status: number;
  message: string;
  usuario?: any;
  error?: any;
}

async function login(nombreUsuario: string, contrasenaUsuario: string): Promise<LoginResult> {
  try {
    const db = await connectDB();

    console.log(`🔍 Buscando usuario "${nombreUsuario}"`);
    const [rows]: any[] = await db.execute('SELECT * FROM `Usuario` WHERE nombreUsuario = ?', [nombreUsuario]);

    console.log('📊 Filas obtenidas:', rows.length);

    if (rows.length === 0) {
      return { status: 404, message: 'Usuario no encontrado' };
    }

    const usuario = rows[0];

    if (usuario.contrasenaUsuario !== contrasenaUsuario) {
      return { status: 401, message: 'Contraseña incorrecta' };
    }

    return { status: 200, message: 'Login exitoso', usuario };
  } catch (error) {
    console.error('⚠️ Error:', error);
    return { status: 500, message: 'Error interno del servidor', error };
  }
}

export default login;
