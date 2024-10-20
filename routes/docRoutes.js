const express = require("express");
const controller = require("../controllers/docController");
const multer = require("multer");
const path = require("path")

const router = express.Router();
const upload = multer({dest: path.join(__dirname, "uploads")});

router.post("/generate", upload.fields([{ name: 'swaggerDoc' }, { name: 'testCaseFile' }]), controller.generateDoc)

module.exports = router;