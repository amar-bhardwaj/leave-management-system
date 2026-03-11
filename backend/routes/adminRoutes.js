const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware");

/*
ADMIN AUTH CHECK
*/
const checkAdmin = (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied" });
    return false;
  }
  return true;
};

/*
GET ALL EMPLOYEES
GET /api/admin/employees
*/
router.get("/employees", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
CREATE EMPLOYEE
POST /api/admin/employees
*/
router.post("/employees", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const { name, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    const newUser = new User({
      name,
      phone,
      password,
      role: "employee"
    });

    await newUser.save();

    res.json({ message: "Employee created successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
DELETE EMPLOYEE
DELETE /api/admin/employees/:id
*/
router.delete("/employees/:id", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
RESET EMPLOYEE PASSWORD
PUT /api/admin/reset-password/:userId
*/
router.put("/reset-password/:userId", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const { newPassword } = req.body;

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;

    await user.save();

    res.json({ message: "Password reset successfully" });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET ALL LEAVE REQUESTS
GET /api/admin/leaves
*/
router.get("/leaves", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const leaves = await Leave.find()
      .populate("employee", "name phone")
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
APPROVE LEAVE
PUT /api/admin/leaves/:id/approve
*/
router.put("/leaves/:id/approve", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "approved";

    await leave.save();

    res.json({ message: "Leave approved", leave });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
REJECT LEAVE
PUT /api/admin/leaves/:id/reject
*/
router.put("/leaves/:id/reject", auth, async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "rejected";

    await leave.save();

    res.json({ message: "Leave rejected", leave });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;