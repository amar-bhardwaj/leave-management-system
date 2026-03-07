require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

/*
MIDDLEWARE
*/
app.use(cors({
  origin: "*", // change to frontend domain in production
  credentials: true
}));

app.use(express.json());

/*
API ROUTES
*/
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/users", userRoutes);

/*
HEALTH CHECK
*/
app.get("/", (req, res) => {
  res.send("Leave Management Backend Running 🚀");
});

/*
GLOBAL ERROR HANDLER
*/
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

/*
DATABASE CONNECTION
*/
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection failed:", err))
.then(() => {
  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((error) => {
  console.error("MongoDB connection failed:", error);
});