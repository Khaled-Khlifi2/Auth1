const { getDB } = require('../config/db');

async function createReclamation(req, res) {
  const { titre, nomClient, societe, date, priorite, description, clientId } = req.body;

  // Vérification des champs requis
  if (!titre || !nomClient || !societe || !date || !priorite || !description || !clientId) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    const db = getDB();
    const result = await db.collection('reclamations').insertOne({
      titre,
      nomClient,
      societe,
      date,
      priorite,
      description,
      clientId,
      createdAt: new Date(), // Ajout d'un timestamp si nécessaire
    });
    res.status(201).json({ message: 'Reclamation créée', reclamationId: result.insertedId });
  } catch (err) {
    console.error('Error creating reclamation:', err);
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message,
      stack: err.stack // optionnel : montre la stack trace complète
    });
  }
}

async function getReclamations(req, res) {
  const clientId = req.query.clientId; // filtrer par clientId si fourni

  try {
    const db = getDB();
    const query = clientId ? { clientId } : {};
    const reclamations = await db.collection('reclamations')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.json(reclamations);
  } catch (err) {
    console.error('Error fetching reclamations:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { createReclamation, getReclamations };