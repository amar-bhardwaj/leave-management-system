require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");

const app = express();

/*
MIDDLEWARE
*/
app.use(cors({
  origin: "*",
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
CREATE DEFAULT ADMIN
*/
const createDefaultAdmin = async () => {

  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {

    const admin = new User({
      name: "Admin",
      phone: "9877582893",
      password: "admin123",
      role: "admin"
    });

    await admin.save();

    console.log("Default admin created");
    console.log("Phone: 9877582893");
    console.log("Password: admin123");
  }

};

/*
DATABASE CONNECTION
*/
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("MongoDB Connected");

    await createDefaultAdmin(); // ⭐ THIS WAS MISSING

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });