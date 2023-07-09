const User = require("../models/User");

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const userId = req.userId; 

    // Find the user by ID and update the profile fields
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "An error occurred while updating the profile" });
  }
};