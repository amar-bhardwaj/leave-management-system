const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  leaveType: {
    type: String,
    enum: ["full-day", "half-day"],
    required: true
  },
  halfDayType: {
    type: String,
    enum: ["first-half", "second-half"],
    required: function () {
      return this.leaveType === "half-day";
    }
  },
  fromDate: Date,
  toDate: Date,
  reason: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);