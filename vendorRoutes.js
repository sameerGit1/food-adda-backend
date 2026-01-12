const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.post("/restaurant", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Restaurant saved successfully ✅",
      restaurant
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
