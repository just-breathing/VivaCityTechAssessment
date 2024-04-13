const { Pool } = require('pg');
require('dotenv').config();


// Create a PostgreSQL connection pool
const Userspool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Time a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // Time to wait before timing out when connecting a new client
  });

  
  
  module.exports={Userspool};