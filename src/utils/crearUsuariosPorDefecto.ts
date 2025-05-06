// utils/crearUsuariosPorDefecto.ts
import { Connection } from 'mysql2/promise';

export async function crearUsuariosPorDefecto(db: Connection) {
  const usuarios = [
    { nombre: 'admin', email: 'admin@pettie.com', role: 'admin' },
    { nombre: 'owner', email: 'owner@pettie.com', role: 'owner' },
    { nombre: 'pettier', email: 'pettier@pettie.com', role: 'pettier' },
  ];

  for (const user of usuarios) {
    const [rows]: any = await db.query('SELECT idUsuario FROM Usuario WHERE emailUsuario = ?', [user.email]);

    if (rows.length === 0) {
      const [result]: any = await db.query(
        'INSERT INTO Usuario (nombreUsuario, contrasenaUsuario, emailUsuario, role, fechaAltaPlataforma) VALUES (?, ?, ?, ?, CURDATE())',
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
          await db.query('INSERT INTO Pettier (idPettier, numeroCuenta) VALUES (?, ?)', [id, 'ES7620770024003102575766']);
          break;
      }

      console.log(`Usuario ${user.nombre} creado con ID ${id}`);
    } else {
      console.log(`Usuario ${user.nombre} ya existe.`);
    }
  }
}
