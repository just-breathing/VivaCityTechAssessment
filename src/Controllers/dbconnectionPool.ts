import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Create a PostgreSQL connection pool
const Userspool = new Pool({
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME as string,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Time a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // Time to wait before timing out when connecting a new client
});

export { Userspool as pool };
