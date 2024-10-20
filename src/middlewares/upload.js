const multer = require('multer');
const path = require('path');

// Configure multer to save files temporarily in /tmp or another upload directory
const storage = multer.diskStorage({
  destination: '/tmp/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;