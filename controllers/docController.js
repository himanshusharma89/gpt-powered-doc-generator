const generateFromGPT = require('../services/gptService');
const parseSwagger = require('../models/swaggerModel');
const fs = require("fs");

// Generate documentation from uploaded Swagger and test files
const generateDoc = async function (req, res, next) {
  try {
    const swaggerFile = req.body['swaggerDoc'];
    const testFile = req.body['testCaseFile'];

    // Parse files and send content to GPT
    const swaggerContent = await parseSwagger(swaggerFile);
    const testContent = await fs.readFileSync(testFile, "utf-8");

    const documentation = await generateFromGPT(swaggerContent, testContent);

    res.status(200).json({ message: 'Documentation generated successfully!', documentation });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

module.exports = generateDoc