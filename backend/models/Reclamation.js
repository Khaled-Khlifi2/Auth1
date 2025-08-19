const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  nomClient: { type: String, required: true },
  societe: { type: String, required: true },
  date: { type: Date, required: true },
  priorite: { type: String, required: true },
  description: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reclamation', reclamationSchema);
