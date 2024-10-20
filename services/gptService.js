const { Configuration, OpenAIApi } = require('openai');

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateFromGPT = async function (swaggerData, testCases) {
    const prompt = `
    Generate a detailed technical document based on the following:

    Swagger Data:
    ${JSON.stringify(swaggerData, null, 2)}

    Unit Test Cases:
    ${testCases.join('\n')}

    Provide:
    1. Overview of the API.
    2. Explanation of each endpoint.
    3. Inputs and outputs.
    4. Error handling and edge cases.
    5. Summary of test coverage.
  `;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 1500,
  });

  return response.data.choices[0].text;
}