const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Dotenv set-up
const dotenv = require('dotenv');
dotenv.config();

const pool = require('./utils/db');

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

app.use('*', appRoutes);

// Server start
app.listen(PORT, () => console.log(msgServerStarted));
