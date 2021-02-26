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

const messagesController = {
  getAll: async (req, res) => {
    res.status(httpOK).send('I am all messages');
  },
  getById: async (req, res) => {
    res.status(httpOK).send('I am message by id');
  }
};

module.exports = messagesController;
