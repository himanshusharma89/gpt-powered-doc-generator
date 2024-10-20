const swaggerParser = require('swagger-parser');
const fs = require('fs').promises;
const YAML = require('yaml');

// Check if the uploaded file is valid JSON or YAML
const isValidJsonOrYaml = (content) => {
  try {
    JSON.parse(content); // Try to parse as JSON
    return true;
  } catch {
    try {
      YAML.parse(content); // Try to parse as YAML
      return true;
    } catch {
      return false; // Not valid JSON or YAML
    }
  }
};

// Parse and validate Swagger file
const parseSwagger = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    if (!isValidJsonOrYaml(fileContent)) {
      throw new Error('Invalid Swagger file format. Expecting JSON or YAML.');
    }

    // Parse and validate the Swagger content
    const apiSpec = fileContent.trim().startsWith('{')
      ? JSON.parse(fileContent) // JSON
      : YAML.parse(fileContent); // YAML

    await swaggerParser.validate(apiSpec); // Validate the parsed Swagger schema
    return apiSpec;
  } catch (error) {
    throw new Error('Invalid Swagger file: ' + error.message);
  }
};

module.exports = parseSwagger;
