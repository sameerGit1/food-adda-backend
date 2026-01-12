const express = require("express");
const router = express.Router();

const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");
const Review = require("../models/Review");

/**
 * 🔍 CUSTOMER SEARCH
 * GET /api/customer/search?city=Latur&food=Pizza
 */
router.get("/search", async (req, res) => {
  try {
    const { city, food } = req.query;

    if (!city || !food) {
      return res.status(400).json({ message: "City and food required" });
    }

    // City ke restaurants
    const restaurants = await Restaurant.find({
      city: city
    });

    const restaurantIds = restaurants.map(r => r._id);

    // Food search
    const foods = await Food.find({
      restaurantId: { $in: restaurantIds },
      name: { $regex: food, $options: "i" }
    }).populate("restaurantId");

    const result = foods.map(f => ({
      restaurantId: f.restaurantId._id,
      restaurantName: f.restaurantId.name,
      address: f.restaurantId.address,
      rating: f.restaurantId.rating,
      foodName: f.name,
      price: f.price,
      image: f.image
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * 🏪 RESTAURANT DETAIL + FOODS + REVIEWS
 * GET /api/customer/restaurant/:id
 */
router.get("/restaurant/:id", async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId);
    const foods = await Food.find({ restaurantId });
    const reviews = await Review.find({ restaurantId });

    res.json({
      restaurant,
      foods,
      reviews
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
