const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    // Extract registration data from request body
    const { username, firstName, lastName, password } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      firstName,
      lastName,
      password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
};
