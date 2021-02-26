const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// show all users
router.get('/', usersController.getAll);

// show user profile by ID
router.get('/:id', usersController.getById);

// show messages by user id
router.get('/:id/messages', usersController.getMessagesByUserId);

module.exports = router;
