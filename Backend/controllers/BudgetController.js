const { Client } = require("pg");

const client = new Client({
  user: "smartbudget",
  host: "localhost",
  database: "smart_budget",
  password: "smartbudget",
  port: 5432, // Default PostgreSQL port
});

client.connect();

exports.getBudget = async (req, res) => {
  const { user_id } = req.params;

  try {
    const query = "SELECT * FROM budget WHERE user_id = $1";
    const values = [user_id];

    const result = await client.query(query, values);
    const budget = result.rows;

    res.status(200).json(budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({ error: "Failed to fetch budget" });
  }
};

exports.addBudget = async (req, res) => {
  const { amount, user_id } = req.body;

  try {
    const query =
      "INSERT INTO budget (amount, user_id) VALUES ($1, $2) RETURNING *";
    const values = [amount, user_id];

    const result = await client.query(query, values);
    const addedBudget = result.rows[0];

    res.status(201).json(addedBudget);
  } catch (error) {
    console.error("Error adding budget:", error);
    res.status(500).json({ error: "Failed to add budget" });
  }
};

exports.removeBudget = async (req, res) => {
  const { user_id, id } = req.body;

  try {
    const query = "DELETE FROM budget WHERE user_id = $1 AND id = $2";
    const values = [user_id, id];

    await client.query(query, values);

    res.status(200).json({ message: "Budget removed successfully" });
  } catch (error) {
    console.error("Error removing budget:", error);
    res.status(500).json({ error: "Failed to remove budget" });
  }
};
