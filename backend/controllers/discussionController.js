// controllers/discussionController.js
const Discussion = require('../models/discussion');
const { ObjectId } = require('mongodb');

exports.createDiscussion = (db) => async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    const { ticketId, message } = req.body;
    if (!ticketId || !message) return res.status(400).json({ message: 'Ticket ID and message required' });

    const discussionModel = new Discussion(db);
    const discussion = await discussionModel.create(ticketId, decoded.userId, message);
    res.status(201).json({ message: 'Discussion created', discussion });
  });
};

exports.getDiscussions = (db) => async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, async () => {
    const discussionModel = new Discussion(db);
    const discussions = await discussionModel.getByTicket(req.params.ticketId);
    res.json(discussions);
  });
};

exports.addMessage = (db) => async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });

    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const discussionModel = new Discussion(db);
    const modified = await discussionModel.addMessage(req.params.discussionId, decoded.userId, message);
    res.json({ message: 'Message added', updated: modified });
  });
};
