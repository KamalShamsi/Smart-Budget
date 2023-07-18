const { Client } = require('pg');

const client = new Client({
  user: 'smartbudget',
  host: 'localhost',
  database: 'smart_budget',
  password: 'smartbudget',
  port: 5432, // Default PostgreSQL port
});

exports.updateProfile = async (req, res) => {
  try {
    await client.connect();

    const { firstName, lastName } = req.body;
    const userId = req.userId;

    // Find the user by ID and update the profile fields
    const queryText = 'UPDATE profiles SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *';
    const values = [firstName, lastName, userId];
    const result = await client.query(queryText, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await client.end();

    return res.status(200).json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    await client.connect();

    // Query the database to find the user with the provided username and password
    const queryText = 'SELECT * FROM profiles WHERE username = $1 AND password = $2';
    const values = [username, password];
    const result = await client.query(queryText, values);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    await client.end();

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'An error occurred during login' });
  }
};
