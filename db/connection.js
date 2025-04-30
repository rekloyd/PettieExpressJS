const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MariaDB:', err);
    process.exit(1);
  }
  console.log('Conectado a MariaDB exitosamente!');
});

module.exports = connection;
