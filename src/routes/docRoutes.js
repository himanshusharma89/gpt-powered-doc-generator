// docRoutes.js - Defines routes for documentation generation
const express = require('express');
const generateDoc = require('../controllers/docController');
const upload = require('../middlewares/upload'); // multer configuration to save files in /tmp

const router = express.Router();

// Route to generate documentation by uploading Swagger and test files
router.post(
  '/generate',
  upload.fields([{ name: 'swaggerDoc', maxCount: 1 }, { name: 'testCaseFile', maxCount: 1 }]),
  generateDoc
);

module.exports = router;