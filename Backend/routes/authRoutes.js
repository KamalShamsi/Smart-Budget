const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login with existing user credentials
router.post('/login', authController.login);

// Logout the current user
router.post('/logout', authController.logout);

module.exports = router;
