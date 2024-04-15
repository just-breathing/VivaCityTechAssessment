"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a PostgreSQL connection pool
const Userspool = new pg_1.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Time a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // Time to wait before timing out when connecting a new client
});
exports.pool = Userspool;
