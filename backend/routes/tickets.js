// routes/tickets.js
const express = require('express');
const { createTicket, getTickets } = require('../controllers/ticketController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Create ticket (protected)
router.post('/', verifyToken, createTicket);

// Get all tickets (protected)
router.get('/', verifyToken, getTickets);

module.exports = router;
