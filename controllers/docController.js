const gptService = require('../services/gptService');
const fileService = require('../services/fileService');
const parseSwagger = require('../models/swaggerModel');

// Generate documentation from uploaded Swagger and test files
const generateDoc = async function (req, res, next) {
  try {
    const swaggerFile = req.files['swaggerDoc'][0];
    const testFile = req.files['testCaseFile'][0];

    // Parse files and send content to GPT
    const swaggerContent = await parseSwagger(swaggerFile.path);
    const testContent = await fs.readFile(testFile.path, "utf-8");

    const documentation = await generateFromGPT(swaggerContent, testContent);

    res.status(200).json({ message: 'Documentation generated successfully!', documentation });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};

module.exports = {
  generateDoc: generateDoc
}