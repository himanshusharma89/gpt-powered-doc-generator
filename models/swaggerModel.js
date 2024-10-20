const swaggerParser = require('swagger-parser');

// Parse and validate Swagger file
const parseSwagger = async (filePath) => {
  try {
    const apiSpec = await swaggerParser.validate(filePath);
    return apiSpec;
  } catch (error) {
    throw new Error('Invalid Swagger file: ' + error.message);
  }
};

module.exports = parseSwagger