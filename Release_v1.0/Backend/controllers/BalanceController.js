const { Client } = require("pg");

const client = new Client({
  user: "smartbudget",
  host: "localhost",
  database: "smart_budget",
  password: "smartbudget",
  port: 5432, // Default PostgreSQL port
});

client.connect();

exports.addBalance = async (req, res) => {
  const { amount, user_id } = req.body;
  try {
    const query =
      "INSERT INTO balance (amount, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET amount = $1 RETURNING *";
    const values = [amount, user_id];

    const result = await client.query(query, values);
    const addedOrUpdatedBalance = result.rows[0];

    res.status(200).json(addedOrUpdatedBalance);
  } catch (error) {
    console.error("Error adding/updating balance:", error);
    res.status(500).json({ error: "Failed to add/update balance" });
  }
};

exports.getBalance = async (req, res) => {
  const { user_id } = req.params;

  try {
    const query = "SELECT * FROM balance WHERE user_id = $1";
    const values = [user_id];

    const result = await client.query(query, values);
    const balance = result.rows;

    res.status(200).json(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
};

exports.updateBalance = async (req, res) => {
  const { amount, user_id } = req.body;
  try {
    const query =
      "UPDATE balance SET amount = $1 WHERE user_id = $2 RETURNING *";
    const values = [amount, user_id];
    const result = await client.query(query, values);
    const updatedBalance = result.rows[0];

    res.status(200).json(updatedBalance);
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ error: "Failed to update balance" });
  }
};
