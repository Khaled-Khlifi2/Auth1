const express = require('express');
const { createReclamation, getReclamations } = require('../controllers/reclamationController');
const verifyToken = require('../middleware/authMiddleware'); // JWT auth

const router = express.Router();

// Créer une réclamation
router.post('/', verifyToken, createReclamation);

// Récupérer les réclamations (option clientId pour filtrer)
router.get('/', verifyToken, getReclamations);

module.exports = router;
