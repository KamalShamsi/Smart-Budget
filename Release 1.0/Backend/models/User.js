const { Client } = require("pg");

const client = new Client({
  user: "smartbudget",
  host: "localhost",
  database: "smart_budget",
  password: "smartbudget",
  port: 5432, // Default PostgreSQL port
});

client.connect();

const addUser = async (userData) => {
  try {
    const { username, password, firstName, lastName } = userData;

    const query =
      "INSERT INTO profiles (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)";
    const values = [username, password, firstName, lastName];

    await client.query(query, values);

    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

module.exports = { addUser };
