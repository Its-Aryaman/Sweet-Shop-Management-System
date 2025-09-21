const Sweet = require("../models/Sweet");

// Add a new sweet
const addSweet = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const sweet = await Sweet.create({ name, category, price, description });
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Error adding sweet", error: error.message });
  }
};

// Get all sweets
const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sweets", error: error.message });
  }
};

// Search sweets by name, category, price range
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Error searching sweets", error: error.message });
  }
};

// Update sweet
const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Error updating sweet", error: error.message });
  }
};

// Delete sweet (Admin only)
const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sweet", error: error.message });
  }
};

module.exports = { addSweet, getSweets, searchSweets, updateSweet, deleteSweet };
