const { Client } = require('pg');
const dotenv = require('dotenv');

const path = require('path');
const envPath = path.resolve(__dirname, '../.env'); // Reemplaza '../ruta/al/archivo/.env' con la ubicación correcta
const result = dotenv.config({ path: envPath });

if(result.error) {
  console.error('Error al cargar el archivo .env:', result.error);
  process.exit(1);
}

// Configura la información de conexión
const connectionConfig = {
  user: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  host: process.env.HOST_DATABASE,
  port: 5432,
  database: process.env.POSTGRESQL_DATABASE, 
};

// Crea una nueva instancia del cliente PostgreSQL
const clientDB = new Client(connectionConfig);

// Conecta al servidor PostgreSQL
setTimeout(() => {
  clientDB.connect()
  .then(() => {
    console.log(`Conneted to ${connectionConfig.host} on port ${connectionConfig.port}`);
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });
}, 2000);

module.exports = clientDB;