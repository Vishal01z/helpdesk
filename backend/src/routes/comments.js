// routes/comments.js
const express = require('express');
const router = express.Router();
const { Comment } = require('../models'); // Assuming you have a Comment model
const { authenticate } = require('../middleware/auth'); // Optional auth middleware
const commentRoutes = require('./routes/comments');
app.use('/api/comments', commentRoutes);


// Get all comments for a ticket
router.get('/ticket/:ticketId', async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const comments = await Comment.findAll({ where: { ticketId }, order: [['createdAt', 'ASC']] });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment to a ticket
router.post('/ticket/:ticketId', authenticate, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const comment = await Comment.create({
      ticketId,
      userId: req.user.id, // from auth middleware
      text,
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
