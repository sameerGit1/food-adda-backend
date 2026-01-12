const express = require("express");
const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.post("/", async (req, res) => {
  const { restaurantId, rating, comment } = req.body;

  // Save review
  await Review.create({ restaurantId, rating, comment });

  // Update restaurant rating
  const restaurant = await Restaurant.findById(restaurantId);

  const totalRating =
    restaurant.rating * restaurant.ratingCount + rating;

  restaurant.ratingCount += 1;
  restaurant.rating = totalRating / restaurant.ratingCount;

  await restaurant.save();

  res.json({ success: true });
});

module.exports = router;
