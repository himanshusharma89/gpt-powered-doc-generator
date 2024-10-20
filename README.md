# GPT Powered Doc Generator

A basic working integration of GPT that parses the Swagger and unit test files. A mechanism that intelligently formats and generates technical documentation from these sources.

## Features

- AI integration that parses the Swagger and unit test files
- Formats and generates technical documentation from the Swagger and unit test files
- Extract output in human-readable markdown form, explaining the functionality as per the input

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

## License

<p xmlns:cc="http://creativecommons.org/ns#" >This work is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt=""></a></p>
## Contact

For any queries or issues, please contact [contact@himanshusharma.tech](mailto:contact@himanshusharma.tech).