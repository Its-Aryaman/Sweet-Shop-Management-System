
import Sweet from '../models/Sweet.js';

export const addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  try {
    const sweetExists = await Sweet.findOne({ name });
    if (sweetExists) {
      return res.status(400).json({ message: 'Sweet with this name already exists' });
    }

    const sweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: 'Error adding sweet', error: error.message });
  }
};

export const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const query = {};

  if (name) query.name = { $regex: name, $options: 'i' };
  if (category) query.category = { $regex: category, $options: 'i' };
  if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

  try {
    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSweet = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;

  try {
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (name && name !== sweet.name) {
      const sweetExists = await Sweet.findOne({ name });
      if (sweetExists) {
        return res.status(400).json({ message: 'Sweet with this name already exists' });
      }
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true, runValidators: true }
    );
    res.json(updatedSweet);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sweet', error: error.message });
  }
};

export const deleteSweet = async (req, res) => {
  const { id } = req.params;

  try {
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json({ message: 'Sweet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const purchaseSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  try {
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    sweet.quantity -= quantity;
    await sweet.save();
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const restockSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  try {
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    sweet.quantity += quantity;
    await sweet.save();
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

