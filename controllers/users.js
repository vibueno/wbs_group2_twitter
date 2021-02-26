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

const sqlMessagesByUserId = `
  SELECT * FROM (
    SELECT row_to_json(userinfo) AS "user"
    FROM (
      SELECT us1.*
      FROM users us1
      WHERE us1.id=$1
    ) AS userinfo
  ) AS userdata,
    (SELECT json_agg(row_to_json(messagesinfo)) AS "messages"
    FROM (
    SELECT ms.id, ms.text, ms.date
    FROM messages AS ms
    JOIN users us2 ON us2.id = ms.id_user
    WHERE us2.id=$1
  ) AS messagesinfo
) AS messagesdata `;

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
    const { id } = req.params;

    try {
      if (!validId(id)) {
        throw buildResponse(httpBadRequest, resOpFailure, msgInvalidIdFormat);
      }

      const sqlUserById = {
        text: sqlMessagesByUserId,
        values: [parseInt(id)]
      };

      const messages = await pool.query(sqlUserById);

      if (!messages.rows.length) {
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
            `Succesfully fetched messages from user with id ${id}`,
            messages.rows[0]
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
  }
};

module.exports = usersController;
