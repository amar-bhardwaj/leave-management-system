const router = require("express").Router();
const Leave = require("../models/Leave");
const auth = require("../middleware/authMiddleware");

// Apply Leave
router.post("/apply", auth, async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      employee: req.user.id
    });

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get My Leaves
router.get("/my", auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Leaves (Admin Only)
router.get("/all", auth, async (req, res) => {
  try {
    // Check if admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const leaves = await Leave.find()
      .populate("employee", "name email");

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;