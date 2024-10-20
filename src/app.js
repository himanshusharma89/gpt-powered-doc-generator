// app.js - Main Express configuration
require('dotenv').config(); // Load environment variables
const express = require('express');
const docRoutes = require('./routes/docRoutes');
const errorHandler = require('./middlewares/errorhandler');

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/api/documents', docRoutes);

// Error-handling middleware
app.use(errorHandler);

module.exports = app;