const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables from .env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(client => {
        console.log('Connected to the database');
        client.release();  // Release the client back to the pool
    })
    .catch(err => console.error('Connection error:', err.message));

module.exports = pool;
