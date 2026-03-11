const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const bcrypt = require("bcryptjs");


// GET ALL EMPLOYEES
router.get("/all", authMiddleware, async (req, res) => {
  try {

    const employees = await User.find({ role: "employee" })
      .select("-password");

    res.json(employees);

  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});


// CREATE EMPLOYEE
router.post("/create", authMiddleware, adminMiddleware, async (req, res) => {

  try {

    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ phone });

    if (existing) {
      return res.status(400).json({ message: "Phone already exists" });
    }

    const employee = new User({
      name,
      phone,
      password,
      role: "employee"
    });

    await employee.save();

    res.json({ message: "Employee created successfully" });

  } catch (error) {

    console.error("Create employee error:", error);
    res.status(500).json({ message: "Server error" });

  }

});


// DELETE EMPLOYEE
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Employee deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
});


//PASSWORD RESET
router.put("/reset-password/:id", authMiddleware, async (req, res) => {

  try {

    const { password } = req.body;

    await User.findByIdAndUpdate(req.params.userId, {
      password: newPassword
    });

    res.json({ message: "Password reset successful" });

  } catch (error) {

    res.status(500).json({ message: "Error resetting password" });

  }

});

module.exports = router;