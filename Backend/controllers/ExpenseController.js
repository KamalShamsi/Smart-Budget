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
  const { name, amount, date_added, user_id, category } = req.body;

  try {
    const query =
      "INSERT INTO expenses (name, amount, date_added, user_id, category) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [name, amount, date_added, user_id, category];

    const result = await client.query(query, values);
    const addedExpense = result.rows[0];

    // Here, you fetch the existing balance and subtract the new expense from it
    const existingBalanceQuery = "SELECT * FROM balance WHERE user_id = $1";
    const balanceResult = await client.query(existingBalanceQuery, [user_id]);
    const existingBalance =
      balanceResult.rows.length > 0
        ? parseFloat(balanceResult.rows[0].amount)
        : 0;

    const newBalance = existingBalance - parseFloat(amount);

    const updateBalanceQuery =
      "INSERT INTO balance (amount, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET amount = $1 RETURNING *";
    await client.query(updateBalanceQuery, [newBalance, user_id]);

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
  const { user_id, id } = req.body;

  try {
    // First, retrieve the amount of the expense to be deleted
    const expenseQuery =
      "SELECT * FROM expenses WHERE user_id = $1 AND id = $2";
    const expenseResult = await client.query(expenseQuery, [user_id, id]);
    const expense = expenseResult.rows[0];

    const query = "DELETE FROM expenses WHERE user_id = $1 AND id=$2";
    const values = [user_id, id];

    await client.query(query, values);

    // Now, fetch the existing balance and increase it by the amount of the deleted expense
    const existingBalanceQuery = "SELECT * FROM balance WHERE user_id = $1";
    const balanceResult = await client.query(existingBalanceQuery, [user_id]);
    const existingBalance =
      balanceResult.rows.length > 0
        ? parseFloat(balanceResult.rows[0].amount)
        : 0;

    const newBalance = existingBalance + parseFloat(expense.amount);

    // Finally, update the balance with the new amount
    const updateBalanceQuery =
      "INSERT INTO balance (amount, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET amount = $1 RETURNING *";
    await client.query(updateBalanceQuery, [newBalance, user_id]);

    res.status(200).json({ message: "Expense removed successfully" });
  } catch (error) {
    console.error("Error removing expense:", error);
    res.status(500).json({ error: "Failed to remove expense" });
  }
};
