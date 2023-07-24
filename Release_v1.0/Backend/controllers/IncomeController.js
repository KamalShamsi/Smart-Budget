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
  const { name, amount, date_added, user_id, category } = req.body;

  try {
    const query =
      "INSERT INTO incomes (name, amount, date_added, category, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [name, amount, date_added, category, user_id];

    const result = await client.query(query, values);
    const addedIncome = result.rows[0];

    const existingBalanceQuery = "SELECT * FROM balance WHERE user_id = $1";
    const balanceResult = await client.query(existingBalanceQuery, [user_id]);
    const existingBalance =
      balanceResult.rows.length > 0
        ? parseFloat(balanceResult.rows[0].amount)
        : 0;

    const newBalance = existingBalance + parseFloat(amount);

    const updateBalanceQuery =
      "INSERT INTO balance (amount, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET amount = $1 RETURNING *";
    await client.query(updateBalanceQuery, [newBalance, user_id]);

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
  const { user_id, id } = req.body;

  try {
    // Fetch income before removing it
    const incomeQuery = "SELECT * FROM incomes WHERE user_id = $1 AND id = $2";
    const incomeResult = await client.query(incomeQuery, [user_id, id]);

    if (incomeResult.rows.length === 0) {
      throw new Error("Income not found");
    }

    const incomeAmount = parseFloat(incomeResult.rows[0].amount);

    // Delete the income
    const deleteQuery = "DELETE FROM incomes WHERE user_id = $1 AND id = $2";
    await client.query(deleteQuery, [user_id, id]);

    // Fetch the current balance
    const balanceQuery = "SELECT * FROM balance WHERE user_id = $1";
    const balanceResult = await client.query(balanceQuery, [user_id]);

    if (balanceResult.rows.length === 0) {
      throw new Error("Balance not found");
    }

    let currentBalance = parseFloat(balanceResult.rows[0].amount);

    // Subtract the income amount from the current balance
    let newBalance = currentBalance - incomeAmount;

    // Update the balance in the database
    const updateBalanceQuery =
      "UPDATE balance SET amount = $1 WHERE user_id = $2 RETURNING *";
    await client.query(updateBalanceQuery, [newBalance, user_id]);

    res.status(200).json({ message: "Income removed successfully" });
  } catch (error) {
    console.error("Error removing income:", error);
    res.status(500).json({ error: "Failed to remove income" });
  }
};
