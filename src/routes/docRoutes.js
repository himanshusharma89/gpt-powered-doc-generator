// docRoutes.js - Defines routes for documentation generation
const express = require('express');
const multer = require('multer');
const generateDoc = require('../controllers/docController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Store files in 'uploads/' folder

// Route to generate documentation by uploading Swagger and test files
router.post(
  '/generate',
  upload.fields([{ name: 'swaggerDoc', maxCount: 1 }, { name: 'testCaseFile', maxCount: 1 }]),
  generateDoc
);

module.exports = router;