const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'likeme',
  port: process.env.DB_PORT || 5432,
  max: 10, 
  idleTimeoutMillis: 30000, 
  allowExitOnIdle: true, 
});

const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(25) NOT NULL,
      img VARCHAR(1000),
      descripcion VARCHAR(255),
      likes INT DEFAULT 0
    );
  `;

  try {
    await pool.query(query);
    console.log("Tabla 'posts' creada o ya existente.");
  } catch (error) {
    console.error("Error al crear la tabla 'posts':", error);
    throw error;
  }
};

const initDB = async () => {
  console.log('Inicializando base de datos...');
  try {
    await createTables();
    console.log('Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('Error durante la inicialización de la base de datos:', error);
  }
};

module.exports = { pool, initDB };
