const OpenAI = require('openai');
const {OPENAI_API_KEY} = process.env;

// Configure OpenAI API
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const generateFromGPT = async function (swaggerData, testCases) {
    console.log(typeof testCases);
    const prompt = `
    Generate a detailed technical document based on the following:

    Swagger Data:
    ${JSON.stringify(swaggerData, null, 2)}

    Unit Test Cases:
    ${testCases}

    Provide:
    1. Overview of the API.
    2. Explanation of each endpoint.
    3. Inputs and outputs.
    4. Error handling and edge cases.
    5. Summary of test coverage.
  `;

  const response = await openai.completions.create({
    model: 'davinci-002',
    prompt: prompt,
    max_tokens: 1500,
  });

  return response.data.choices[0].text;
}

module.exports = generateFromGPT
