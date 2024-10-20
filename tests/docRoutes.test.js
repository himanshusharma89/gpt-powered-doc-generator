// tests/docRoutes.test.js - Unit tests for the /generate endpoint
const request = require('supertest');
const app = require('../src/app'); // Import the Express app
const fs = require('fs').promises;
const path = require('path');

describe('POST /api/documents/generate', () => {
  const swaggerFilePath = path.join(__dirname, '../input/swagger.json');
  const testCaseFilePath = path.join(__dirname, '../input/testcases.txt');

  it('should generate documentation successfully with valid files', async () => {
    const response = await request(app)
      .post('/api/documents/generate')
      .attach('swaggerDoc', swaggerFilePath)
      .attach('testCaseFile', testCaseFilePath);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Documentation generated and saved successfully!');
    expect(response.body).toHaveProperty('documentationPath');
  });

  it('should return 400 if files are missing', async () => {
    const response = await request(app)
      .post('/api/documents/generate'); // No files attached

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Files are required.');
  });

  it('should return 500 if invalid files are uploaded', async () => {
    const invalidFilePath = path.join(__dirname, '../input/invalid.txt');

    const response = await request(app)
      .post('/api/documents/generate')
      .attach('swaggerDoc', invalidFilePath)
      .attach('testCaseFile', invalidFilePath);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });

  afterAll(async () => {
    const tmpDir = '/tmp';
    const files = await fs.readdir(tmpDir);
  
    // Filter only the files that start with 'swaggerDoc' or 'testCaseFile'
    const filesToDelete = files.filter(file =>
      file.startsWith('swaggerDoc') || file.startsWith('testCaseFile')
    );
  
    // Delete only the relevant files
    await Promise.all(filesToDelete.map(file => 
      fs.unlink(path.join(tmpDir, file)).catch((err) => {
        console.warn(`Failed to delete ${file}:`, err.message); // Log non-critical errors
      })
    ));
  });
  
});
