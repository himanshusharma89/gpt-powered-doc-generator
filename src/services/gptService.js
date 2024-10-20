const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

  const response = await model.generateContent(prompt);

  return response.response.text();
}

module.exports = generateFromGPT
