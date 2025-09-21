const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "chocolate", "candy", "bakery"
  price: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sweet", sweetSchema);
