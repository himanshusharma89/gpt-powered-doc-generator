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
    1. Provide an overview of the module, or feature or API and its purpose.
    2. Explain each endpoint, including inputs, outputs, and HTTP methods.
    3. Describe error handling strategies and how the API manages edge cases.
    4. Summarize what the module or feature does based on unit tests
    5. Describe the unit test coverage and its focus areas.
    6. Highlight any gaps, assumptions, or areas for future improvements.
    7. Provides a clear and concise explanation for developers onboarding onto the project.

    Guidelines:
    - Write in plain English, maintaining clarity and simplicity.
    - Use active voice with calm, confident tone.
    - Avoid buzzwords, adverbs, and filler.
    - Make the content scannable and structured to maintain clarity.
    - Aim for a Flesch reading score of 80+—keep things concise without missing important points.
  `;

  try {
    const response = await model.generateContent(prompt);
    if (response?.response?.text) {
      return response.response.text(); // Ensure the text is correctly returned
    } else {
      throw new Error('Failed to generate content: No text in response');
    }
  } catch (error) {
    console.error('Error generating content from GPT:', error);
    throw error;
  }
};

module.exports = generateFromGPT;