const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protected Register (Admin Only)
router.post(
  "/register",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { name, email, password } = req.body;

    // 🔥 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee"
    });

    res.json(user);
  }
);



// TEMP ROUTE - CREATE FIRST ADMIN
router.get("/create-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Main Admin",
      email: "admin@company.com",
      password: hashedPassword,
      role: "admin"
    });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;