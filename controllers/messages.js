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
  msgFetchedAllMessages,
  msgDBError,
  msgInvalidIdFormat
} = require('../vars/messages');

const { validId } = require('../utils/validations');

const sqlAllMessages = `
SELECT us.*,
  (
    SELECT json_agg(row_to_json(messages)) FROM
      (
        SELECT ms.id, ms.text, ms.date
        FROM messages ms WHERE ms.id_user = us.id
      ) messages
  ) AS messages
FROM users us `;

const sqlMessageById = `
  SELECT ms.id, ms.text, ms.date,
    (
      SELECT row_to_json(users) FROM
        (
          SELECT us.*
          FROM users us
          WHERE us.id = ms.id_user
        ) users
      ) AS user
  FROM messages ms
  WHERE ms.id=$1;`;

const messagesController = {
  getAll: async (req, res) => {
    try {
      const messages = await pool.query(sqlAllMessages);

      res
        .status(httpOK)
        .json(
          buildResponse(
            httpOK,
            resOpSuccess,
            msgFetchedAllMessages,
            messages.rows
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
  getById: async (req, res) => {
    const { id } = req.params;

    try {
      if (!validId(id)) {
        throw buildResponse(httpBadRequest, resOpFailure, msgInvalidIdFormat);
      }

      const sqlMsgById = {
        text: sqlMessageById,
        values: [parseInt(id)]
      };

      const message = await pool.query(sqlMsgById);

      if (!message.rows.length) {
        throw buildResponse(
          httpNotFound,
          resOpSuccess,
          `Message with id ${id} does not exist`
        );
      }

      res
        .status(httpOK)
        .json(
          buildResponse(
            httpOK,
            resOpSuccess,
            `Succesfully fetched message with id ${id}`,
            message.rows[0]
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

module.exports = messagesController;
