const { Client } = require('pg');

const client = new Client({
  user: 'smartbudget',
  host: 'localhost',
  database: 'smart_budget',
  password: 'smartbudget',
  port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect();

// Controller functions
const addSaving = async (req, res) => {
  const { goal, total, payment, user_id } = req.body;

  try {
    // Insert the new saving goal into the database
    const result = await client.query(
      'INSERT INTO savings (goal, total, payment, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [goal, total, payment, user_id]
    );

    return res.status(201).json({ goal: result.rows[0] });
  } catch (error) {
    console.error('Error creating saving goal:', error);
    return res.status(500).json({ error: 'Failed to create saving goal' });
  }
};

const getSaving = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch all saving goals for a specific user from the database
    const { rows } = await client.query('SELECT * FROM savings WHERE user_id = $1', [user_id]);

    return res.status(200).json({ saving: rows });
  } catch (error) {
    console.error('Error fetching saving goals:', error);
    return res.status(500).json({ error: 'Failed to fetch saving goals' });
  }
};

const removeSaving = async (req, res) => {
  const savingGoalId = req.params.id;

  try {
    console.log('Deleting saving goal with ID:', savingGoalId);

    // Delete the saving goal from the database
    await client.query('DELETE FROM savings WHERE id = $1', [savingGoalId]);

    console.log('Saving goal deleted successfully');

    return res.status(200).json({ message: 'Saving goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting saving goal:', error);
    return res.status(500).json({ error: 'Failed to delete saving goal' });
  }
};

const updateSaving = async (req, res) => {
  const savingGoalId = req.params.id;
  const { goal, total, payment, user_id } = req.body;

  try {
    // Update the saving goal in the database
    const result = await client.query(
      'UPDATE savings SET goal_name = $1, total_amount = $2, monthly_amount = $3 WHERE id = $4 RETURNING *',
      [goal, total, payment, savingGoalId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Saving goal not found' });
    }

    return res.status(200).json({ goal: result.rows[0] });
  } catch (error) {
    console.error('Error updating saving goal:', error);
    return res.status(500).json({ error: 'Failed to update saving goal' });
  }
};

module.exports = {
  addSaving,
  getSaving,
  removeSaving,
  updateSaving,
};
