require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

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

  const admins = [
    {
      name: "Amar Bhardwaj",
      phone: "9877582893",
      password: "admin123"
    },
    {
      name: "Yogesh Gupta",
      phone: "7006752209",
      password: "Saanvi@9871234"
    }
  ];

  for (let adminData of admins) {

    const exists = await User.findOne({ phone: adminData.phone });

    if (!exists) {

      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      const admin = new User({
        name: adminData.name,
        phone: adminData.phone,
        password: hashedPassword,
        role: "admin"
      });

      await admin.save();

      console.log(`✅ Admin created: ${adminData.phone}`);

    } else {
      console.log(`ℹ️ Admin already exists: ${adminData.phone}`);
    }

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