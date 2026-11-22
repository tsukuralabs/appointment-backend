const User = require("../models/userModels");
const {
  validateUserFields,
  validateEditFields,
} = require("../helpers/validation");

// 1. INSERT USER API
const createUser = async (req, res) => {
  try {
    const validationError = validateUserFields(req);
    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const { username, phone, email } = req.body;

    const newUser = await User.create({
      username: username.trim(),
      phone: String(phone).trim(),
      email: email.trim().toLowerCase(),
    });

    return res.status(201).json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// 2. GET ALL USERS API
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// 3. DELETE USER API
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

// 4. UPDATE USER API
const updateUser = async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      return res.status(400).json({
        message: "Invalid edit request: unauthorized or empty fields provided",
      });
    }

    const validationError = validateUserFields(req);
    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const { id } = req.params;
    const { username, phone, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.username = username.trim();
    user.phone = String(phone).trim();
    user.email = email.trim().toLowerCase();
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to update user",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
