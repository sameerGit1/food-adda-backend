const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
