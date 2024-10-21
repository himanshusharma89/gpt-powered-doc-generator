// errorhandler.js - Middleware to handle errors
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: err.message }); // Send JSON error response
};