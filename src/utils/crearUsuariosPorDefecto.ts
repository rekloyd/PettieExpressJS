import { Connection } from 'mysql2/promise';

// Función para crear los usuarios base (admin, owner, pettier)
export async function crearUsuariosPorDefecto(db: Connection) {
  const usuarios = [
    { nombre: 'admin', email: 'admin@pettie.com', role: 'admin' },
    { nombre: 'owner', email: 'owner@pettie.com', role: 'owner' },
    { nombre: 'pettier', email: 'pettier@pettie.com', role: 'pettier' },
  ];

  for (const user of usuarios) {
    const [rows]: any = await db.query(
      'SELECT idUsuario FROM Usuario WHERE emailUsuario = ?',
      [user.email]
    );

    if (rows.length === 0) {
      const [result]: any = await db.query(
        `INSERT INTO Usuario
          (nombreUsuario, contrasenaUsuario, emailUsuario, role, fechaAltaPlataforma)
         VALUES (?, ?, ?, ?, CURDATE())`,
        [user.nombre, '1234', user.email, user.role]
      );

      const id = result.insertId;

      switch (user.role) {
        case 'admin':
          await db.query('INSERT INTO Admin (idAdmin) VALUES (?)', [id]);
          break;
        case 'owner':
          await db.query('INSERT INTO Owner (idOwner) VALUES (?)', [id]);
          break;
        case 'pettier':
          await db.query(
            'INSERT INTO Pettier (idPettier, numeroCuenta) VALUES (?, ?)',
            [id, 'ES7620770024003102575766']
          );
          break;
      }

      console.log(`Usuario ${user.nombre} creado con ID ${id}`);
    } else {
      console.log(`Usuario ${user.nombre} ya existe.`);
    }
  }
}

// Funciones auxiliares para generar datos aleatorios
function generarCadenaAleatoria(longitud: number): string {
  return Math.random().toString(36).substring(2, 2 + longitud);
}

function generarIBAN(): string {
  let num = '';
  for (let i = 0; i < 22; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return 'ES' + num;
}

// Función para crear 3 pettiers con ID fijos y datos aleatorios
export async function crearTresPettierPorDefecto(db: Connection) {
  const ids = [19, 20, 21];

  for (const id of ids) {
    const [rows]: any = await db.query(
      'SELECT idUsuario FROM Usuario WHERE idUsuario = ?',
      [id]
    );

    if (rows.length === 0) {
      const nombre = `pettier_${generarCadenaAleatoria(6)}`;
      const email = `${nombre}@pettie.com`;
      const contrasena = generarCadenaAleatoria(8);
      const coins = Math.floor(Math.random() * 1000);
      const iban = generarIBAN();

      await db.query(
        `INSERT INTO Usuario
          (idUsuario, nombreUsuario, contrasenaUsuario, emailUsuario, cantidadPettieCoins, role, fechaAltaPlataforma)
         VALUES (?, ?, ?, ?, ?, 'pettier', CURDATE())`,
        [id, nombre, contrasena, email, coins]
      );

      await db.query(
        'INSERT INTO Pettier (idPettier, numeroCuenta) VALUES (?, ?)',
        [id, iban]
      );

      console.log(`Pettier ${nombre} creado con ID ${id}`);
    } else {
      console.log(`Pettier con ID ${id} ya existe.`);
    }
  }
}
