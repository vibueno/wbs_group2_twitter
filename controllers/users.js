const pool = require('../utils/db');
const buildResponse = require('../utils/response');
const {
  httpOK,
  httpBadRequest,
  httpNotFound,
  httpServerError,
  resOpSuccess,
  resOpFailure
} = require('../vars/constants');

const usersController = {
  getAll: async (req, res) => {
    res.status(httpOK).send('I am all users');
  },
  getById: async (req, res) => {
    res.status(httpOK).send('I am user by id');
  },
  getMessagesByUserId: async (req, res) => {
    res.status(httpOK).send('I am messages by user id');
  }
};

module.exports = usersController;
