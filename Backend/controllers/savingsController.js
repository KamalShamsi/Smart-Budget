const { Client } = require('pg');

const client = new Client({
  user: 'smartbudget',
  host: 'localhost',
  database: 'smart_budget',
  password: 'smartbudget',
  port: 5432, // Default PostgreSQL port
});

client.connect();

// Controller functions
exports.addSaving = async (req, res) => {
  const { goal, total, payment, date_added, user_id } = req.body;

  try {
    const query = 
      "INSERT INTO savings (goal, total, payment, date_added, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [goal, total, payment, date_added, user_id];

    const result = await client.query(query, values);
    const addedSaving = result.rows[0];
    
    res.status(201).json(addedSaving);
  } catch (error) {
    console.error("Error adding saving goal:", error);
    res.status(500).json({error: "Failed to add saving goal"});
  }
};

exports.getSaving = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch all saving goals for a specific user from the database
    const result = await client.query('SELECT * FROM savings WHERE user_id = $1', [user_id]);
    savings = result.rows;

    return res.status(200).json(savings);
  } catch (error) {
    console.error('Error fetching saving goals:', error);
    return res.status(500).json({ error: 'Failed to fetch saving goals' });
  }
};

exports.removeSaving = async (req, res) => {
  const { user_id, id } = req.body;

  try {
    const query = "DELETE FROM savings WHERE user_id = $1 AND id = $2";
    const values = [user_id, id];

    await client.query(query, values);

    return res.status(200).json({ message: "saving removed successfully" });
  } catch (error) {
    console.error("Error removing saving:", error);
    return res.status(500).json({ error: "Failed to remove saving" });
  }
};

exports.editSaving = async (req, res) => {
  const { goal, total, payment, date_added, id } = req.body;
  try {
    const query = "UPDATE savings SET (goal, total, payment, date_added) VALUES ($1, $2, $3, $4) WHERE id = $5";
    values = [goal, total, payment, date_added, id];
    const result = await client.query(query, values);
    res.status(200).json();
  } catch (error) {
    console.log("edit savings failed");
    res.status(500).json({ error: "Failed to edit savings" });
  }
  
};

