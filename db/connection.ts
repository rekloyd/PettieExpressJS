import dotenv from 'dotenv';
dotenv.config(); 

import mysql from 'mysql2/promise';

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host:     process.env.DB_HOST,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port:     Number(process.env.DB_PORT),
    });

    console.log('Conectado a MariaDB exitosamente!');
    return connection;
  } catch (err) {
    console.error('Error al conectar a MariaDB:', err);
    process.exit(1);
  }
}

export default connectDB;
