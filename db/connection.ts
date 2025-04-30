import mysql, { Connection } from 'mysql2';

// Crear la conexión con la base de datos
const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)  // Convertir el puerto a número
});

// Establecer la conexión con la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MariaDB:', err);
    process.exit(1); // Salir si la conexión falla
  }
  console.log('Conectado a MariaDB exitosamente!');
});

export default connection; // Exportar la conexión para usarla en otros archivos
