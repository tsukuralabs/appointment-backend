const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");

// Insert user
router.post("/users", createUser);

// Get all users
router.get("/users", getAllUsers);

// Delete user
router.delete("/users/:id", deleteUser);

// Update user
router.put("/users/:id", updateUser);

module.exports = router;