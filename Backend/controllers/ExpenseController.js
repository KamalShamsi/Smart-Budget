const { Client } = require("pg");

const client = new Client({
  user: "smartbudget",
  host: "localhost",
  database: "smart_budget",
  password: "smartbudget",
  port: 5432, // Default PostgreSQL port
});

client.connect();

exports.addExpense = async (req, res) => {
  const { name, amount, date_added, user_id } = req.body;

  try {
    const query =
      "INSERT INTO expenses (name, amount, date_added, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [name, amount, date_added, user_id];

    const result = await client.query(query, values);
    const addedExpense = result.rows[0];

    res.status(201).json(addedExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

exports.getExpense = async (req, res) => {
  const { user_id } = req.params;

  try {
    const query = "SELECT * FROM expenses WHERE user_id = $1";
    const values = [user_id];

    const result = await client.query(query, values);
    const expenses = result.rows;

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

exports.removeExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM expenses WHERE id = $1";
    const values = [id];

    await client.query(query, values);

    res.status(200).json({ message: "Expense removed successfully" });
  } catch (error) {
    console.error("Error removing expense:", error);
    res.status(500).json({ error: "Failed to remove expense" });
  }
};