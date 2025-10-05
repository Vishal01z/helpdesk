// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: Number(process.env.RATE_LIMIT_MAX) || 60,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests" });
  }
});
app.use(limiter);

// Routes
app.use('/auth', require('./routes/auth'));      // Ensure ye file exist karti hai
app.use('/tickets', require('./routes/tickets')); // Ensure ye file exist karti hai

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Helpdesk Backend Running ✅' });
});

module.exports = app;
