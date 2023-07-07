const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// User data (for simplicity, keeping it in-memory)
let users = [{ username: "test", password: "123456" }];

// MongoDB Configuration
const dbURI = "mongodb://localhost:27017/";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Smart Budget API");
});

// Register endpoint
app.post("/register", (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  // Check if the username is already taken
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Create a new user object
  const newUser = { username, password, firstName, lastName };

  // Save the user in the user list
  users.push(newUser);

  return res.status(201).json({ message: "Registration successful" });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user with the provided username
  const user = users.find((user) => user.username === username);

  // Check if the user exists and the password matches
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  return res.status(200).json({ message: "Login successful" });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
