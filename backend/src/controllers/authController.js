const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responses');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json(errorResponse("FIELD_REQUIRED", "email/password", "Email and password are required"));
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json(errorResponse("ALREADY_EXISTS", "email", "User already exists"));

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'user' });

    res.json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json(errorResponse("SERVER_ERROR", "", err.message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(errorResponse("FIELD_REQUIRED", "email/password", "Email and password are required"));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json(errorResponse("INVALID_CREDENTIALS", "email", "Invalid email or password"));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json(errorResponse("INVALID_CREDENTIALS", "password", "Invalid email or password"));

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json(errorResponse("SERVER_ERROR", "", err.message));
  }
};
