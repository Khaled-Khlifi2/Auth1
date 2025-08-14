// controllers/ticketController.js
const { getDB } = require('../config/db');

async function createTicket(req, res) {
  const { title, status, priority, assignedTo } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  // Set default values
  const ticketStatus = status || 'en cours'; // default 'en cours'
  const ticketPriority = priority || 'moyenne'; // default 'moyenne'
  const ticketAssignedTo = assignedTo || 'Ahlem'; // default 'Ahlem'
  const createdAt = new Date();

  const db = getDB();
  try {
    const result = await db.collection('tickets').insertOne({
      title,
      status: ticketStatus,
      priority: ticketPriority,
      assignedTo: ticketAssignedTo,
      createdAt,
    });
    res.status(201).json({ message: 'Ticket created', ticketId: result.insertedId });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getTickets(req, res) {
  const db = getDB();
  try {
    const tickets = await db.collection('tickets').find().toArray();
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createTicket, getTickets };
