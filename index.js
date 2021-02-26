const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Dotenv set-up
const dotenv = require('dotenv');
dotenv.config();

const { PORT } = process.env;

const { msgServerStarted } = require('./vars/messages');

// Start express
const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Routes
const appRoutes = require('./routes/App');
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');

app.use('/users', usersRoutes);
app.use('/messages', messagesRoutes);
app.use('*', appRoutes);

// Server start
app.listen(PORT, () => console.log(msgServerStarted));
