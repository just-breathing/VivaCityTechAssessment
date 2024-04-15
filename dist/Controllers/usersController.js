"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = void 0;
const dbconnectionPool_1 = require("./dbconnectionPool");
// Function to create a new user
const createUser = (username_1, email_1, age_1, ...args_1) => __awaiter(void 0, [username_1, email_1, age_1, ...args_1], void 0, function* (username, email, age, lp = null, gp = null) {
    const client = yield dbconnectionPool_1.pool.connect();
    try {
        const checkQuery = `
      SELECT CASE 
                 WHEN EXISTS (SELECT 1 FROM applicants WHERE username = $1) THEN 'Username already exists'
                 ELSE NULL 
             END AS username_status,
             CASE 
                 WHEN EXISTS (SELECT 1 FROM applicants WHERE email = $2) THEN 'Email already exists'
                 ELSE NULL 
             END AS email_status;
    `;
        const query = `
      INSERT INTO applicants (username, email, age,linkedINProfile, GithubProfile )
      VALUES ($1, $2, $3,$4,$5) RETURNING *;
    `;
        const values = [username, email, age, lp, gp];
        const exists = yield client.query(checkQuery, [username, email]);
        const { rows } = exists;
        let status = "";
        if (rows[0].username_status !== null && rows[0].email_status !== null) {
            status = "Both username and email already exist";
        }
        else if (rows[0].username_status) {
            status = rows[0].username_status;
        }
        else if (rows[0].email_status) {
            status = rows[0].email_status;
        }
        else {
            const result = yield client.query(query, values);
            if (result.rows[0]) {
                status = JSON.stringify({ Status: "User Created Successfully", insertedData: result.rows[0] });
            }
        }
        return { message: status };
    }
    catch (error) {
        console.error("Error creating user:", error.message);
    }
    finally {
        client.release(); // Release the client back to the pool
    }
});
exports.createUser = createUser;
// Function to get a user by ID
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield dbconnectionPool_1.pool.connect();
    try {
        const query = "SELECT * FROM applicants WHERE id = $1";
        const result = yield client.query(query, [userId]);
        return result.rows[0];
    }
    finally {
        client.release(); // Release the client back to the pool
    }
});
exports.getUserById = getUserById;
// Function to update a user by ID
const updateUser = (userId, username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield dbconnectionPool_1.pool.connect();
    try {
        const query = "UPDATE applicants SET username = $1, email = $2 WHERE id = $3 RETURNING *";
        const values = [username, email, userId];
        const result = yield client.query(query, values);
        return result.rows[0];
    }
    finally {
        client.release(); // Release the client back to the pool
    }
});
exports.updateUser = updateUser;
// Function to delete a user by ID
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield dbconnectionPool_1.pool.connect();
    try {
        const query = "DELETE FROM applicants WHERE id = $1";
        yield client.query(query, [userId]);
    }
    finally {
        client.release(); // Release the client back to the pool
    }
});
exports.deleteUser = deleteUser;
// Function to get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield dbconnectionPool_1.pool.connect();
    try {
        const query = "SELECT * FROM applicants";
        const result = yield client.query(query);
        return result.rows;
    }
    finally {
        client.release(); // Release the client back to the pool
    }
});
exports.getAllUsers = getAllUsers;
