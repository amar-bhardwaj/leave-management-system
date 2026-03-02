const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protected Register (Admin Only)
router.post(
  "/register",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: "employee"
    });

    res.json(user);
  }
);

module.exports = router;