// routes/discussionRoutes.js
const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

module.exports = (db) => {
  router.post('/', discussionController.createDiscussion(db));
  router.get('/:ticketId', discussionController.getDiscussions(db));
  router.patch('/:discussionId', discussionController.addMessage(db));
  return router;
};
