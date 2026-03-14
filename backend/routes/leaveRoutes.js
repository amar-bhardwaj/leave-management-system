const express = require("express");
const router = express.Router();

const Leave = require("../models/Leave");
const authMiddleware = require("../middleware/authMiddleware");

/*
APPLY LEAVE
POST /api/leaves/apply
*/
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const { leaveType, halfDayType, fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const leave = new Leave({
      employee: req.user.id || req.user._id || req.user.userId,
      leaveType,
      halfDayType,
      fromDate,
      toDate,
      reason,
      status: "pending" 
    });

    const savedLeave = await leave.save();

    res.json(savedLeave);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error applying leave" });
  }
});

/*
GET MY LEAVES
*/
router.get("/my", authMiddleware, async (req, res) => {
  try {

    const leaves = await Leave.find({
      employee: req.user.id || req.user._id || req.user.userId
    })
      .populate("employee", "name phone")
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error fetching leaves" });

  }
});

module.exports = router;