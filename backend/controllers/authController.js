const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || typeof username !== "string" || !username.trim()) {
      return res.status(400).json({ message: "Valid username is required" });
    }

    if (username.trim().length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = await User.findOne({ username: normalizedUsername });
    if (existingUser) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = new User({
      username: normalizedUsername,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({ message: "User registered" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Username is already taken" });
    }
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const normalizedUsername = username.trim().toLowerCase();
    const user = await User.findOne({ username: normalizedUsername });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET || (process.env.NODE_ENV === "production" ? null : "dev_fallback_secret");
    if (!secret) {
      console.error("CRITICAL: JWT_SECRET is not configured!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "24h" });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = {
  register,
  login,
};

