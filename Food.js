const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }
});

module.exports = mongoose.model("Food", foodSchema);
