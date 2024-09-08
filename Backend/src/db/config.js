const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: process.env.PASSWORD,
  database: 'likeme',
  allowExitOnIdle: true,

});

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY, 
      titulo VARCHAR(25), 
      img VARCHAR(1000),
      descripcion VARCHAR(255), 
      likes INT
    );
  `);
};

const initDB = async () => {
  console.log('Creando tablas si no existen...');
  await createTables();
};

module.exports = { pool, initDB };
