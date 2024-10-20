// server.js - Entry point of the application
const app = require("./src/app"); // Import the main Express app
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});