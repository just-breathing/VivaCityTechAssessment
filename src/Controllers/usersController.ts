import { pool } from "./dbconnectionPool";

// Function to create a new user
const createUser = async (username: string, email: string, age: number,lp: string | null = null, gp: string | null = null) => {
  const client = await pool.connect();

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

    const values = [username, email, age,lp,gp];
    const exists = await client.query(checkQuery, [username, email]);
    const { rows } = exists;
    let status: string = "";

    if (rows[0].username_status !== null && rows[0].email_status !== null) {
      status = "Both username and email already exist";
    } else if (rows[0].username_status) {
      status = rows[0].username_status;
    } else if (rows[0].email_status) {
      status = rows[0].email_status;
    } else {
      const result = await client.query(query, values);
      if (result.rows[0]) {
        status = JSON.stringify({ Status: "User Created Successfully", insertedData: result.rows[0] });
      }
    }

    return { message: status };
  } catch (error:any) {
    console.error("Error creating user:", error.message);
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to get a user by ID
const getUserById = async (userId: number) => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM applicants WHERE id = $1";
    const result = await client.query(query, [userId]);
    return result.rows[0];
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to update a user by ID
const updateUser = async (userId: number, username: string, email: string) => {
  const client = await pool.connect();
  try {
    const query = "UPDATE applicants SET username = $1, email = $2 WHERE id = $3 RETURNING *";
    const values = [username, email, userId];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to delete a user by ID
const deleteUser = async (userId: number) => {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM applicants WHERE id = $1";
    await client.query(query, [userId]);
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to get all users
const getAllUsers = async () => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM applicants";
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export { createUser, getUserById, updateUser, deleteUser, getAllUsers };
