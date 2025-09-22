import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({
      username,
      password,
      role: role || "user", // Default to 'user' if role not provided
    });

    const token = generateToken(user._id, user.role);
    res
      .status(201)
      .json({ token, user: { id: user._id, username, role: user.role } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    res.json({ token, user: { id: user._id, username, role: user.role } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
