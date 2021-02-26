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

const {
  msgFetchedAllUsers,
  msgDBError,
  msgInvalidIdFormat
} = require('../vars/messages');

const { validId } = require('../utils/validations');

const sqlAllUsers = 'SELECT * FROM users';

const usersController = {
  getAll: async (req, res) => {
    try {
      const users = await pool.query(sqlAllUsers);

      res
        .status(httpOK)
        .json(
          buildResponse(httpOK, resOpSuccess, msgFetchedAllUsers, users.rows)
        );
    } catch (e) {
      console.error(Error(e.message));
      if (e.status) res.status(e.status).json(e);
      else {
        res
          .status(httpServerError)
          .json(
            buildResponse(httpServerError, resOpFailure, msgDBError, e.message)
          );
      }
    }
  },
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      if (!validId(id)) {
        throw buildResponse(httpBadRequest, resOpFailure, msgInvalidIdFormat);
      }

      const sqlUserById = {
        text: sqlAllUsers + ' WHERE id=$1;',
        values: [parseInt(id)]
      };

      const user = await pool.query(sqlUserById);

      if (!user.rows.length) {
        throw buildResponse(
          httpNotFound,
          resOpSuccess,
          `User with id ${id} does not exist`
        );
      }

      res
        .status(httpOK)
        .json(
          buildResponse(
            httpOK,
            resOpSuccess,
            `Succesfully fetched user with id ${id}`,
            user.rows[0]
          )
        );
    } catch (e) {
      console.error(Error(e.message));
      if (e.status) res.status(e.status).json(e);
      else {
        res
          .status(httpServerError)
          .json(
            buildResponse(httpServerError, resOpFailure, msgDBError, e.message)
          );
      }
    }
  },
  getMessagesByUserId: async (req, res) => {
    res.status(httpOK).send('I am messages by user id');
  }
};

module.exports = usersController;
