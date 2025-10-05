// src/routes/tickets.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { Ticket } = require('../models');
const { errorResponse } = require('../utils/responses');

// Create ticket
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    if (!title || !description) return res.status(400).json(errorResponse("FIELD_REQUIRED", "title/description", "Title and description required"));

    const ticket = await Ticket.create({ title, description, deadline, createdBy: req.user.id });
    res.json(ticket);
  } catch (err) {
    res.status(500).json(errorResponse("SERVER_ERROR", "", err.message));
  }
});

// Get all tickets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    res.status(500).json(errorResponse("SERVER_ERROR", "", err.message));
  }
});

module.exports = router;
