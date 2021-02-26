const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages');

// show all messages
router.get('/', messagesController.getAll);

// show messages by ID
router.get('/:id', messagesController.getById);

module.exports = router;
