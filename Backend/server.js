const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
const router = require("./routes/userRoutes");

const client = new Client({
  user: "smartbudget",
  host: "localhost",
  database: "smart_budget",
  password: "smartbudget",
  port: 5432, // Default PostgreSQL port
});

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Smart Budget API");
});

// Create profiles table
const createProfilesTable = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(50),
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100) UNIQUE
      )
    `);
    console.log("Profiles table created");
  } catch (error) {
    console.error("Error creating profiles table:", error);
  }
};

// Create saving goals table
const createSavingTable = async () => {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS incomes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        category VARCHAR(50),
        amount DECIMAL(10, 2) NOT NULL,
        date_added DATE NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES profiles(id)
    );
      CREATE TABLE IF NOT EXISTS savings (
        goal VARCHAR(50),
        total INTEGER,
        payment INTEGER
      )
    `);
    console.log("Saving goals table created");
  } catch (error) {
    console.error("Error creating saving goals table:", error);
  }
};

// Create income table
const createIncomesTable = async () => {
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS incomes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        category VARCHAR(50),
        amount DECIMAL(10, 2) NOT NULL,
        date_added DATE NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES profiles(id)
    );
    `);
    console.log("Incomes table created");
  } catch (error) {
    console.error("Error creating incomes table:", error);
  }
};

// Create expense table
const createExpensesTable = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50),
      category VARCHAR(50),
      amount DECIMAL(10, 2) NOT NULL,
      date_added DATE NOT NULL,
      user_id INT,
      FOREIGN KEY (user_id) REFERENCES profiles(id)
    );
    `);
    console.log("Expenses table created");
  } catch (error) {
    console.error("Error creating expenses table:", error);
  }
};

// savings endpoint
app.post("/savings", async (req, res) => {
  const { goal, total, payment } = req.body;
  try {
    await client.query(
      "INSERT INTO savings (goal, total, payment) VALUES ($1, $2, $3)",
      [goal, total, payment]
    );
    return res.status(200).json({ message: "Saving goal created" });
  } catch (error) {
    console.error("Saving goal creation failed:", error);
    return res.status(500).json({ error: "Saving goal creation failed" });
  }
});

app.get("/savings", async (req, res) => {
  try {
    const savings = await client.query(
      "SELECT goal, total, payment FROM savings"
    );
    return res.status(200).json({ savings: savings.rows });
  } catch (error) {
    console.error("Error fetching savings:", error);
    return res.status(500).json({ error: "Error fetching savings" });
  }
});

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  try {
    // Check if the username or email is already taken
    const existingUser = await client.query(
      "SELECT * FROM profiles WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Insert a new user profile into the database
    await client.query(
      "INSERT INTO profiles (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5)",
      [username, password, firstName, lastName, email]
    );

    return res.status(200).json({
      message: "Registration successful",
      username,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username and password
    const user = await client.query(
      "SELECT * FROM profiles WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userId = user.rows[0].id;

    // Generate a token
    const token = jwt.sign({ username }, "secretKey");

    return res.status(200).json({ message: "Login successful", token, userId });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.username = decoded.username;
    next();
  });
};

// Protected endpoint
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const { username } = req;
    const profile = await client.query(
      "SELECT username, first_name, last_name, email FROM profiles WHERE username = $1",
      [username]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json({ profile: profile.rows[0] });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({ error: "Error fetching profile" });
  }
});

// Start the server
const port = process.env.PORT || 8000;

client
  .connect()
  .then(() => {
    createProfilesTable().then(() => {
      createIncomesTable().then(() => {
        createExpensesTable().then(() => {
          createSavingTable().then(() => {
            app.listen(port, () => {
              console.log(`Server is running on port ${port}`);
            });
          });
        });
      });
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
