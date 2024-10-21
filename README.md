# GPT Powered Doc Generator

A basic working integration of GPT that parses the Swagger and unit test files. A mechanism that intelligently formats and generates technical documentation from these sources.

## Features

- AI integration that parses the Swagger and unit test files
- Formats and generates technical documentation from the Swagger and unit test files
- Extract output in human-readable markdown form, explaining the functionality as per the input

## POC

Here's the Proof of Concept (PoC) for the [GPT Powered Doc Generator](https://docs.google.com/document/d/1D8Vo4Qu8bJxAJxDDC4YhQjhP9HQaHPqsUMTtS7JnJkQ/edit?usp=sharing)

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed. [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js. Used for managing dependencies.

### Installation

1. **Clone the Repository**

 ```bash
    git clone https://github.com/himanshusharma89/gpt-powered-doc-generator.git
    cd gpt-powered-doc-generator
 ```

2. **Install Dependencies**

 ```bash
    npm install
 ```

### Configuration

#### **Environment Variables**
   
Create a `.env` file in the root directory of the project and add the following environment variable:

```env
PORT=3000
API_KEY=YOUR_GEMINI_PROJECT_API_KEY
```

### Running the Application

#### **Start the Server**

```bash
npm start
```

The server will start and listen on port 3000 by default. You can change the port by modifying the `server.js` file if needed.

### Dockerization

To run the application in Docker:

1. **Download the image**

 You can pull the [GPT Powered Doc Generator image](https://hub.docker.com/r/himanshusharma89/gpt-powered-doc-generator) using the below command:
 ```bash
    docker pull --platform=linux/arm64 himanshusharma89/gpt-powered-doc-generator
 ```

2. **Run the Docker Container**

 ```bash
    docker run -d -p 3000:3000 gpt-powered-doc-generator
 ```

 The application will be accessible at `http://localhost:3000` on your local machine.


### Triggering the API

This command sends a POST request to your /generate endpoint with your swagger and unit test input files.

```bash
curl -X POST http://localhost:3000/api/documents/generate \
  -F "swaggerDoc=@<ABSOLUTE_PATH_TO_YOUR_SWAGGER_FILE>" \
  -F "testCaseFile=@<ABSOLUTE_PATH_TO_YOUR_UNIT_TEST_FILE>"
```

Expected Response:
```json
{
    "message":"Documentation generated and saved successfully!",
    "documentationPath":"<ABSOLUTE_PATH_TO_YOUR_REPO>/output/documentation_<DATE_TIMESTAMP>.md"
}
```

### Testing

#### **Run Tests**

```bash
npm test
```

This command runs the unit tests using Jest.

### Code Quality

**ESLint**: Enforces code style and best practices. Configured for 2-space indentation.

### Analysis: Strengths, Weaknesses, and Improvements

| **Aspect**            | **Strengths**                                                | **Weaknesses**                                             | **Potential Improvements**                                |
|-----------------------|--------------------------------------------------------------|------------------------------------------------------------|----------------------------------------------------------|
| **Automation**        | Reduces manual effort through automated documentation       | Heavily relies on Gemini AI for output                     | Introduce local fallback templates for offline use       |
| **Technology Choice** | Node.js ensures fast, non-blocking backend performance       | Lacks asynchronous job handling (no queuing for heavy loads) | Use job queue manager for background task management    |
| **Scalability**       | Follows MVC structure, making the code easy to extend        | No job queue for handling large uploads                    | Use job queue manager to process requests asynchronously |
| **Error Handling**    | Handles invalid Swagger files and deletes temporary files    | Minimal logging for system errors                         | Add detailed logs and monitoring for production environments |
| **Security**          | Simple design for local development                          | No authentication or authorization for the API            | Add API key or OAuth-based authentication for secure access |
| **AI Model Choice**   | Uses Gemini AI with large token windows                      | Lacks fine-tuning flexibility compared to OpenAI’s GPT models | Consider GPT-4 (32k) for improved output quality        |
| **Cost Management**   | Gemini pricing starts at $0.0375 per 1M input tokens         | Can become expensive with high volume API use             | Use GPT-3.5 Turbo ($0.002 per 1K tokens) for cheaper tasks |
| **Flexibility**       | Clear support for Swagger and test files                     | Limited to basic input types (JSON/YAML, plain text)       | Add support for PDF and DOCX input formats               |


## License

<p xmlns:cc="http://creativecommons.org/ns#" >This work is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>
## Contact

For any queries or issues, please contact [contact@himanshusharma.tech](mailto:contact@himanshusharma.tech).