const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔹 ROUTES
const vendorRoutes = require("./routes/vendorRoutes");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); // ⭐ REVIEWS

const app = express();

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔹 MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error ❌", err);
  });

// 🔹 ROUTES
app.use("/api/vendor", vendorRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes); // ⭐ REVIEW ROUTE

// 🔹 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Food Adda Backend Running 🚀");
});

// 🔹 SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
