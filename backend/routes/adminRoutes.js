const router = require("express").Router();
const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware");

// Get All Leaves (Admin)
router.get("/leaves", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const leaves = await Leave.find().populate("employee");
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve / Reject Leave
router.put("/leave/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const { status } = req.body;

    const leave = await Leave.findById(req.params.id);
    leave.status = status;

    await leave.save();

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;