const express = require('express');
const tasksRouter = require('./routes/tasks');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/tasks', tasksRouter);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
