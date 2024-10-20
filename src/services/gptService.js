// gptService.js - Service to interact with Google Generative AI API
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI with API key from environment
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Generate documentation using GPT from Swagger and test data
const generateFromGPT = async (swaggerData, testCases) => {
  const prompt = `
    Generate a clear, detailed technical document using the following inputs:

    Swagger Data:
    ${JSON.stringify(swaggerData, null, 2)}

    Unit Test Cases:
    ${testCases}

    The document should:
    1. Provide an overview of the API and its purpose.
    2. Explain each endpoint, including inputs, outputs, and HTTP methods.
    3. Describe error handling strategies and how the API manages edge cases.
    4. Summarize the unit test coverage and its focus areas.
    5. Highlight any gaps, assumptions, or areas for future improvements.

    Guidelines:
    - Write in plain English, maintaining clarity and simplicity.
    - Use active voice with calm, confident tone.
    - Avoid adverbs, buzzwords, and filler language.
    - Structure the content to be easy to read and scan, aiming for a Flesch reading score of 80 or higher.
    - Ensure completeness, but do not make the writing overly complex or verbose.
  `;

  const response = await model.generateContent(prompt);
  return response.response.text();
};

module.exports = generateFromGPT;