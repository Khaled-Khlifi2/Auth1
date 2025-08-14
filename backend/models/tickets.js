// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: 'Ouvert' },
  priority: { type: String, required: true },
  assignedTo: { type: String, required: false },
  date: { type: Date, default: Date.now },
  dateFin: { type: Date },
  reclamationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reclamation' }
});

module.exports = mongoose.model('Ticket', ticketSchema);
