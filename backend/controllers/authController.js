// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

async function register(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const db = getDB();
  const existingUser = await db.collection('login').findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection('login').insertOne({ email, password: hashedPassword });
  res.status(201).json({ message: 'User registered', userId: result.insertedId });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const db = getDB();
  const user = await db.collection('login').findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
}

module.exports = { register, login };
