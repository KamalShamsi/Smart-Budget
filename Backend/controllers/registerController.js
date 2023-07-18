const { Client } = require('pg');

const client = new Client({
  user: 'smartbudget',
  host: 'localhost',
  database: 'smart_budget',
  password: 'smartbudget',
  port: 5432, // Default PostgreSQL port
});

exports.register = async (req, res) => {
  try {
    await client.connect();

    // Extract registration data from request body
    const { username, firstName, lastName, password } = req.body;

    // Implement a minimum password length requirement
    const minimumPasswordLength = 6;
    if (password.length < minimumPasswordLength) {
      return res
        .status(400)
        .json({ error: `Password must be at least ${minimumPasswordLength} characters long` });
    }

    // Check if the username is already taken
    const existingUser = await client.query(
      'SELECT * FROM profiles WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Insert a new user profile into the database
    await client.query(
      'INSERT INTO profiles (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)',
      [username, password, firstName, lastName]
    );

    await client.end();

    return res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};
