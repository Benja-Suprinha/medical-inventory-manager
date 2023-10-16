const { Client } = require('pg');

// Configura la información de conexión
const connectionConfig = {
  user: 'user',
  password: '2023',
  host: 'postgresql',
  port: 5432,
  database: 'proyect', 
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