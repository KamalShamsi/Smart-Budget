const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Update user profile
router.put("/profile", userController.updateProfile);

// Other user routes...

module.exports = router;
