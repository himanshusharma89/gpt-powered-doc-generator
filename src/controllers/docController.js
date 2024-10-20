const fs = require('fs').promises;
const path = require('path');
const parseSwagger = require('../models/swaggerModel');
const generateFromGPT = require('../services/gptService');

// Output directory path
const OUTPUT_DIR = path.join(__dirname, '../../output');

// Ensure the output directory exists
const ensureOutputDir = async () => {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create output directory:', error);
    throw error;
  }
};

// Generate documentation from uploaded Swagger and test files
const generateDoc = async (req, res, next) => {
  try {
    const swaggerFile = req.files['swaggerDoc'][0]; // Extract Swagger file
    const testFile = req.files['testCaseFile'][0];  // Extract Test Case file

    // Parse the Swagger content and read the Test Case content
    const swaggerContent = await parseSwagger(swaggerFile.path);
    const testContent = await fs.readFile(testFile.path, 'utf-8');

    // Generate documentation using GPT service
    const documentationMarkdown = await generateFromGPT(swaggerContent, testContent);

    // Check if documentation is available
    if (!documentationMarkdown) {
      throw new Error('No documentation generated from GPT.');
    }

    // Ensure the output directory exists
    await ensureOutputDir();

    // Define the output markdown file path
    const markdownPath = path.join(OUTPUT_DIR, `documentation_${Date.now()}.md`);

    // Save the documentation as a markdown file
    await fs.writeFile(markdownPath, documentationMarkdown, 'utf8');

    // Delete the uploaded files after processing
    await fs.unlink(swaggerFile.path);
    await fs.unlink(testFile.path);

    // Respond with success message and markdown path
    res.status(200).json({ 
      message: 'Documentation generated and saved successfully!', 
      documentationPath: markdownPath 
    });
  } catch (error) {
    next(error); // Forward error to the error handler middleware
  }
};

module.exports = generateDoc;