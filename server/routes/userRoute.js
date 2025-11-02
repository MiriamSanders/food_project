import express from "express";
import User from "../modules/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// ================== GET USERS (protected) ==================
router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching users" });
  }
});

// ================== GET USER BY EMAIL ==================
router.get("/email/:email", authenticateToken, async (req, res) => {
  try {
    const emailNormalized = req.params.email.trim().toLowerCase();
    const user = await User.findOne({ email: emailNormalized }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching user" });
  }
});

// ================== SIGNUP ==================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password || !address || !role)
      return res.status(400).json({ error: "All fields are required" });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      address,
      role
    });
    await newUser.save();

    const userToSend = newUser.toObject();
    delete userToSend.password;

    res.status(201).json(userToSend);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error creating user" });
  }
});

// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userToSend = user.toObject();
    delete userToSend.password;

    res.json({ user: userToSend, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;
