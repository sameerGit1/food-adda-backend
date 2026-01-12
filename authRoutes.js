const express = require("express");
const bcrypt = require("bcryptjs");
const Vendor = require("../models/Vendor");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Vendor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword
    });

    await vendor.save();

    res.json({ success: true, message: "Vendor registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ success: true, vendor });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
