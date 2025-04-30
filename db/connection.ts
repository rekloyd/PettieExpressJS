import dotenv from 'dotenv';
dotenv.config(); 

import mysql, { Connection } from 'mysql2';

const connection: Connection = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     Number(process.env.DB_PORT)
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MariaDB:', err);
    process.exit(1);
  }
  console.log('Conectado a MariaDB exitosamente!');
});

export default connection;
