const { Client } = require("pg");

const client = new Client({
  user: "smartbudget",
  host: "localhost",
  database: "smart_budget",
  password: "smartbudget",
  port: 5432, // Default PostgreSQL port
});

client.connect();

exports.addIncome = async (req, res) => {
  const { name, amount, date_added, user_id } = req.body;

  try {
    const query =
      "INSERT INTO incomes (name, amount, date_added, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [name, amount, date_added, user_id];

    const result = await client.query(query, values);
    const addedIncome = result.rows[0];

    res.status(201).json(addedIncome);
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ error: "Failed to add income" });
  }
};

exports.getIncome = async (req, res) => {
  const { user_id } = req.params;
  try {
    const query = "SELECT * FROM incomes WHERE user_id = $1";
    const values = [user_id];

    const result = await client.query(query, values);
    const incomes = result.rows;

    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ error: "Failed to fetch incomes" });
  }
};

exports.removeIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM incomes WHERE id = $1";
    const values = [id];

    await client.query(query, values);

    res.status(200).json({ message: "Income removed successfully" });
  } catch (error) {
    console.error("Error removing income:", error);
    res.status(500).json({ error: "Failed to remove income" });
  }
};
