// docController.js - Controller for generating documentation
const generateFromGPT = require('../services/gptService');
const parseSwagger = require('../models/swaggerModel');
const fs = require('fs').promises; // Use promises-based fs to avoid callback issues

// Generate documentation from uploaded Swagger and test files
const generateDoc = async (req, res, next) => {
  try {

    const swaggerFile = req.body['swaggerDoc']; // Extract swaggerDoc from uploaded files
    const testFile = req.body['testCaseFile']; // Extract testCaseFile from uploaded files

    // Parse Swagger file and read test case content
    const swaggerContent = await parseSwagger(swaggerFile);
    const testContent = await fs.readFile(testFile, 'utf-8');

    // Generate documentation using GPT
    const documentation = await generateFromGPT(swaggerContent, testContent);

    res.status(200).json({ message: 'Documentation generated successfully!', documentation });
  } catch (error) {
    next(error); // Forward error to middleware for handling
  }
};

module.exports = generateDoc;