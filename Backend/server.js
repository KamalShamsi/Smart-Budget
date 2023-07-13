const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
const jwt = require("jsonwebtoken");

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

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Smart Budget API");
});

// Create profiles table
const createProfilesTable = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
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
    const newUser = await client.query(
      "INSERT INTO profiles (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING username",
      [username, password, firstName, lastName, email]
    );

    return res
      .status(200)
      .json({ message: "Registration successful", username: newUser.rows[0].username });
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

    // Generate a token
    const token = jwt.sign({ username }, "secretKey");

    return res.status(200).json({ message: "Login successful", token });
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
    createProfilesTable();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
