// docController.js - Controller for generating documentation
const generateFromGPT = require('../services/gptService');
const parseSwagger = require('../models/swaggerModel');
const fs = require('fs').promises; // Use promises-based fs to avoid callback issues

// Generate documentation from uploaded Swagger and test files
const generateDoc = async (req, res, next) => {
  try {
    const swaggerFile = req.files['swaggerDoc'][0]; // Extract swaggerDoc from uploaded files
    const testFile = req.files['testCaseFile'][0]; // Extract testCaseFile from uploaded files

    // Parse Swagger file and read test case content
    const swaggerContent = await parseSwagger(swaggerFile.path);
    const testContent = await fs.readFile(testFile.path, 'utf-8');

    // Generate documentation using GPT
    const documentation = await generateFromGPT(swaggerContent, testContent);

    // Delete files after successful processing
    await fs.unlink(swaggerFile.path);
    await fs.unlink(testFile.path);

    res.status(200).json({ message: 'Documentation generated successfully!', documentation });
  } catch (error) {
    next(error); // Forward error to middleware for handling
  }
};

module.exports = generateDoc;