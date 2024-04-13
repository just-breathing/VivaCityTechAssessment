const {Userspool:pool} = require("./dbconnectionPool");

// Function to create a new user
const createUser = async (username, email,age) => {
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
        INSERT INTO applicants (username, email, age)
        VALUES ($1, $2, $3) returning *
`;


const values = [username, email];
    const exists = await client.query(checkQuery, values);
    const {rows}=exists;
    let status="";
    console.log(rows)
    if (rows[0].username_status!==null && rows[0].email_status!==null) {
        status = 'Both username and email already exist';
    } else if (rows[0].username_status) {
        status = rows[0].username_status;
    } else if (rows[0].email_status) {
        status = rows[0].email_status;
    } 
    else
    {
        values.push(age);
        const result = await client.query(query, values);
        if(result.rows[0])
        {
            status={status:"User Created Successfully",insertedData:result.rows[0]}

        }
    }
    return {message : status}
    



} catch (error) {
    console.error('Error creating user:', error.message);
} finally {
    client.release(); // Release the client back to the pool
}


};

// Function to get a user by ID
const getUserById = async (userId) => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM applicants WHERE id = $1';
    const result = await client.query(query, [userId]);
    return result.rows[0];
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to update a user by ID
const updateUser = async (userId, username, email) => {
  const client = await pool.connect();
  try {
    const query = 'UPDATE applicants SET username = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [username, email, userId];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM applicants WHERE id = $1';
    await client.query(query, [userId]);
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to get all users
const getAllUsers = async () => {
    const client = await pool.connect();
    try {
      const query = 'select * from applicants';
      const result= await client.query(query);
      return result.rows
    } finally {
      client.release(); // Release the client back to the pool
    }
  };
  

module.exports = { createUser, getUserById, updateUser, deleteUser,getAllUsers };
