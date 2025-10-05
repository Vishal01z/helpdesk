const Ticket = require('../models/ticket');

exports.createTicket = async (req, res) => {
  try {
    const { title, description, userEmail } = req.body;
    if (!title || !description || !userEmail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const ticket = await Ticket.create({ title, description, userEmail });
    res.json({ message: 'Ticket saved successfully', ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
